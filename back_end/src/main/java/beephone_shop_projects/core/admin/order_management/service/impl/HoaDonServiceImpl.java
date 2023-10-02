package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderHistoryConverter;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderHistoryResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.HoaDonService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class HoaDonServiceImpl extends AbstractServiceImpl<HoaDon, OrderResponse, OrderRequest, String> implements HoaDonService {

  @Autowired
  private OrderRepositoryImpl hoaDonRepository;

  @Autowired
  private LichSuHoaDonServiceImpl orderHistoryServiceImpl;

  @Autowired
  private LichSuHoaDonRepositoryImpl lichSuHoaDonRepository;

  @Autowired
  private CartRepositoryImpl gioHangRepository;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private OrderConverter orderConverter;

  @Autowired
  private CartServiceImpl gioHangService;

  @Autowired
  private LichSuHoaDonServiceImpl lichSuHoaDonService;

  public HoaDonServiceImpl(OrderRepositoryImpl repo, OrderConverter converter) {
    super(repo, converter);
  }

  @Override
  public OrderResponse getOrderDetailsById(String id) {
    HoaDon order = hoaDonRepository.getOrderDetailsById(id);
    if (order == null) {
      throw new RestApiException(Message.ORDER_NOT_EXIST);
    }
    OrderResponse orderResponse = orderConverter.convertEntityToResponse(order);
    List<OrderHistoryResponse> orderHistories = lichSuHoaDonService.getOrderHistoriesByOrderId(id);
    orderResponse.setOrderHistories(orderHistories);
    return orderResponse;
  }

  @Override
  public OrderResponse placeOrder(Account account, Voucher voucher) throws Exception {
    HoaDon newOrder = new HoaDon();
    newOrder.setMa(hoaDonRepository.getMaxEntityCodeByClass());
    newOrder.setAccount(null);
    newOrder.setVoucher(null);
    newOrder.setLoaiHoaDon(OrderType.DELIVERY);
    newOrder.setGhiChu("Ok");
    newOrder.setDiaChiNguoiNhan("Thanh Xuân, Hà Nội");
    newOrder.setSoDienThoaiNguoiNhan("08345738123");
    newOrder.setTenNguoiNhan("Nguyễn Hữu Tùng");
    newOrder.setTrangThai(OrderStatus.PENDING_CONFIRM);
    newOrder.setCreatedAt(new Date());
    newOrder.setTongTien(new BigDecimal(30000000));
    HoaDon createdOrder = hoaDonRepository.save(newOrder);
    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(createdOrder);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setThaoTac("Tạo Đơn Hàng");
    orderHistory.setMoTa("Khách hàng đặt hàng online");
    orderHistory.setLoaiThaoTac(0);
    lichSuHoaDonRepository.save(orderHistory);
    return orderConverter.convertEntityToResponse(createdOrder);
  }

  @Override
  public Page<OrderResponse> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilter) throws Exception {
    if (searchFilter.getKeyword() == null) {
      searchFilter.setKeyword("");
    }
    if (searchFilter.getCurrentPage() == null) {
      searchFilter.setCurrentPage(1);
    }
    if (searchFilter.getPageSize() == null) {
      searchFilter.setPageSize(5);
    }
    Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize(), Sort.by("createdAt").ascending());
    Page<HoaDon> orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
    return orderConverter.convertToPageResponse(orders);
  }

  @Override
  public OrderResponse updateStatusOrderDelivery(OrderRequest req, String id) throws Exception {
    OrderResponse orderCurrent = getOrderDetailsById(id);
    if (orderCurrent == null) {
      throw new Exception("Đơn hàng không tồn tại!");
    }
    if (req.getTrangThai().equals(OrderStatus.CANCELLED) && req.getOrderHistory().getMoTa().isBlank()) {
      throw new Exception("Bạn chưa nhập lý do hủy đơn hàng!");
    }
    orderCurrent.setTrangThai(req.getTrangThai());
    orderHistoryServiceImpl.save(req.getOrderHistory());
    HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    return orderConverter.convertEntityToResponse(updatedOrderCurrent);
  }

  @Override
  public OrderResponse createOrderPending() throws Exception {
    HoaDon newOrderPending = new HoaDon();
    newOrderPending.setMa(hoaDonRepository.getMaxEntityCodeByClass());
    newOrderPending.setCreatedAt(new Date());
    newOrderPending.setTrangThai(OrderStatus.PENDING_PAYMENT);
    newOrderPending.setLoaiHoaDon(OrderType.AT_COUNTER);
    newOrderPending.setTongTien(new BigDecimal(0));

    GioHang cart = new GioHang();
    cart.setMa(gioHangRepository.getMaxEntityCodeByClass());
    GioHang createdCart = gioHangRepository.save(cart);
    newOrderPending.setCart(createdCart);
    HoaDon createdOrderPending = hoaDonRepository.save(newOrderPending);

    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(createdOrderPending);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setThaoTac("Tạo Đơn Hàng");
    orderHistory.setMoTa("Nhân viên tạo đơn cho khách");
    orderHistory.setLoaiThaoTac(0);
    lichSuHoaDonRepository.save(orderHistory);
    return orderConverter.convertEntityToResponse(createdOrderPending);
  }

  @Override
  public OrderResponse processingPaymentOrder(OrderRequest req, String id) throws Exception {
    OrderResponse orderCurrent = getOrderDetailsById(req.getMa());
    if (orderCurrent == null) {
      throw new Exception("Đơn hàng không tồn tại!");
    }
    orderCurrent.setCart(null);
    orderCurrent.setTrangThai(req.getTrangThai());
    orderCurrent.setTongTien(req.getTongTien());
    orderCurrent.setTongTienSauKhiGiam(req.getTongTienSauKhiGiam());
    orderCurrent.setTienKhachTra(req.getTienKhachTra());
    orderCurrent.setTienThua(req.getTienThua());
    orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());

    HoaDon updateOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    gioHangService.deleteById(req.getCart().getId());

    if (req.getOrderHistory() != null) {
      orderHistoryServiceImpl.save(req.getOrderHistory());
    }
//    hinhThucThanhToanRepository.save(paymentMethod);

    List<HoaDon> ordersPending = hoaDonRepository.getOrdersPending();
    if (ordersPending.isEmpty()) {
      createOrderPending();
    }
    return orderConverter.convertEntityToResponse(updateOrderCurrent);
  }

  @Override
  public List<OrderResponse> getOrdersPending() {
    return orderConverter.convertToListResponse(hoaDonRepository.getOrdersPending());
  }

  @Override
  public OrderResponse getOrderPendingById(String id) {
    HoaDon order = hoaDonRepository.getOrderPendingById(id);
    if (order == null) {
      throw new RestApiException(Message.ORDER_NOT_EXIST);
    }
    return orderConverter.convertEntityToResponse(order);
  }

  @Override
  public Boolean deleteOrderPening(String id) throws Exception {
    OrderResponse getOrder = this.getOrderPendingById(id);
    if (getOrder != null) {
      this.deleteById(getOrder.getId());
      return true;
    }
    return false;
  }


}
