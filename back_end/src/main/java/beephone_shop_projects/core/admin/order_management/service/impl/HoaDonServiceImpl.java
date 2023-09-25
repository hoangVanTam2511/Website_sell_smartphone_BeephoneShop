package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.core.admin.order_management.repository.impl.GioHangRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.HoaDonService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class HoaDonServiceImpl extends AbstractServiceImpl<HoaDon, OrderDto, String> implements HoaDonService {

  @Autowired
  private HoaDonRepositoryImpl hoaDonRepository;

  @Autowired
  private LichSuHoaDonRepositoryImpl lichSuHoaDonRepository;

  @Autowired
  private GioHangRepositoryImpl gioHangRepository;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private OrderConverter orderConverter;

  public HoaDonServiceImpl(HoaDonRepositoryImpl repo, OrderConverter converter) {
    super(repo, converter);
  }

  @Override
  public OrderDto getOrderDetailsById(String id, Boolean isPending) {
    HoaDon order = hoaDonRepository.getOrderById(id, isPending);
    OrderDto orderDto = orderConverter.convertToDto(order);
    return orderDto;
  }

  @Override
  public OrderDto placeOrder(Account account, Voucher voucher) throws Exception {
    HoaDon newOrder = new HoaDon();
    newOrder.setMa(hoaDonRepository.getMaxEntityCodeByClass());
    newOrder.setAccount(null);
    newOrder.setVoucher(null);
    newOrder.setLoaiHoaDon(1);
    newOrder.setGhiChu("Ok");
    newOrder.setDiaChiNguoiNhan("Thanh Xuân, Hà Nội");
    newOrder.setSoDienThoaiNguoiNhan("08345738123");
    newOrder.setTenNguoiNhan("Nguyễn Hữu Tùng");
    newOrder.setTrangThai(0);
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
    return orderConverter.convertToDto(createdOrder);
  }

  @Override
  public Page<OrderDto> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilter) throws Exception {
    if (searchFilter.getKeyword() == null) {
      searchFilter.setKeyword("");
    }
    if (searchFilter.getCurrentPage() == null) {
      searchFilter.setCurrentPage(1);
    }
    if (searchFilter.getPageSize() == null) {
      searchFilter.setPageSize(5);
    }
    Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize(), Sort.by("createdAt").descending());
    Page<HoaDon> orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
    if (searchFilter.getIsPending() && searchFilter.getIsPending() != null) {
      if (orders.isEmpty()) {
        this.createOrderPending();
        orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
      }
    }
    return orderConverter.convertToPageDto(orders);
  }

  @Override
  public OrderDto updateOrder(UpdateOrderDto updateOrderDto, OrderDto orderDto) throws Exception {
    orderDto.setTrangThai(updateOrderDto.getOrderStatus());
    OrderDto updatedOrderDto = this.update(orderDto);
    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setCreatedAt(updateOrderDto.getOrderHistory().getCreatedAt());
    orderHistory.setMoTa(updateOrderDto.getOrderHistory().getMoTa());
    orderHistory.setThaoTac(updateOrderDto.getOrderHistory().getThaoTac());
    orderHistory.setLoaiThaoTac(updateOrderDto.getOrderHistory().getLoaiThaoTac());
    orderHistory.setHoaDon(orderConverter.convertToEntity(updatedOrderDto));
    lichSuHoaDonRepository.save(orderHistory);
    return updatedOrderDto;
  }

  @Override
  public OrderDto createOrderPending() throws Exception {
    HoaDon newOrderPending = new HoaDon();
    newOrderPending.setMa(hoaDonRepository.getMaxEntityCodeByClass());
    newOrderPending.setCreatedAt(new Date());
    newOrderPending.setTrangThai(5);
    newOrderPending.setLoaiHoaDon(0);
    newOrderPending.setTongTien(new BigDecimal(0));
    GioHang cart = new GioHang();
    cart.setMa(gioHangRepository.getMaxEntityCodeByClass());
    GioHang createdCart = gioHangRepository.save(cart);
    newOrderPending.setGioHang(createdCart);
    HoaDon createdOrderPending = hoaDonRepository.save(newOrderPending);
    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(createdOrderPending);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setThaoTac("Tạo Đơn Hàng");
    orderHistory.setMoTa("Nhân viên tạo đơn cho khách");
    orderHistory.setLoaiThaoTac(0);
    lichSuHoaDonRepository.save(orderHistory);
    return orderConverter.convertToDto(createdOrderPending);
  }

  @Override
  public OrderDto updateOrderPending(UpdateOrderDto updateOrderDto) throws Exception {
    OrderDto orderDto = updateOrderDto.getOrderDto();
    OrderDto updatedOrderPending = this.save(orderDto);

    HinhThucThanhToan paymentMethod = new HinhThucThanhToan();
    paymentMethod.setMa(hinhThucThanhToanRepository.getMaxEntityCodeByClass());
    paymentMethod.setHoaDon(orderConverter.convertToEntity(updatedOrderPending));
    paymentMethod.setGhiChu("");
    paymentMethod.setTrangThai(1);
    paymentMethod.setCreatedAt(new Date());
    paymentMethod.setLoaiThanhToan(updateOrderDto.getPaymentMethod().getLoaiThanhToan());
    paymentMethod.setNguoiXacNhan(updateOrderDto.getPaymentMethod().getNguoiXacNhan());
    paymentMethod.setHinhThucThanhToan(updateOrderDto.getPaymentMethod().getHinhThucThanhToan());
    paymentMethod.setSoTienThanhToan(updateOrderDto.getPaymentMethod().getSoTienThanhToan());

    hinhThucThanhToanRepository.save(paymentMethod);

    if (!updateOrderDto.getIsDelivery()) {
      LichSuHoaDon orderHistory = new LichSuHoaDon();
      orderHistory.setCreatedAt(updateOrderDto.getOrderHistory().getCreatedAt());
      orderHistory.setMoTa(updateOrderDto.getOrderHistory().getMoTa());
      orderHistory.setThaoTac(updateOrderDto.getOrderHistory().getThaoTac());
      orderHistory.setLoaiThaoTac(updateOrderDto.getOrderHistory().getLoaiThaoTac());
      orderHistory.setHoaDon(orderConverter.convertToEntity(updatedOrderPending));
      lichSuHoaDonRepository.save(orderHistory);
    }
    return updatedOrderPending;
  }

}
