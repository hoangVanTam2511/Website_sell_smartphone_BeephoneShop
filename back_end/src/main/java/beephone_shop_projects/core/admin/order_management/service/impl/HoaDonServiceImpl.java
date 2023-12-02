package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.AccountConverter;
import beephone_shop_projects.core.admin.order_management.converter.ImeiNotSoldConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderHistoryConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConverter;
import beephone_shop_projects.core.admin.order_management.converter.VoucherConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderHistoryRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderHistoryResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.ImeiChuaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiDaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.OrderItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.HoaDonService;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.HoaDonChiTiet;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.ImeiDaBan;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import beephone_shop_projects.utils.BarcodeGenerator;
import beephone_shop_projects.utils.RandomCodeGenerator;
import com.google.zxing.BarcodeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

  @Autowired
  private AccountConverter accountConverter;

  @Autowired
  private VoucherConverter voucherConverter;

  @Autowired
  private ProductItemConverter productItemConverter;

  @Autowired
  private ProductDetailRepository sanPhamChiTietRepository;

  @Autowired
  private OrderItemRepository orderItemRepository;

  @Autowired
  private ImeiChuaBanCustomRepository imeiChuaBanCustomRepository;

  @Autowired
  private ImeiNotSoldConverter imeiNotSoldConverter;

  @Autowired
  private ImeiDaBanCustomRepository imeiDaBanCustomRepository;

  @Autowired
  private LichSuHoaDonCustomRepository lichSuHoaDonCustomRepository;

  @Autowired
  private OrderHistoryConverter orderHistoryConverter;

  @Autowired
  private VoucherRepository voucherRepository;

  @Autowired
  private BarcodeGenerator barcodeGenerator;

  public HoaDonServiceImpl(OrderRepositoryImpl repo, OrderConverter converter) {
    super(repo, converter);
  }

  @Override
  public OrderResponse getOrderDetailsById(String id) {
    HoaDon order = hoaDonRepository.getOrderDetailsById(id);
    if (order == null) {
      throw new RestApiException("Không tìm thấy đơn hàng");
    }
    OrderResponse orderResponse = orderConverter.convertEntityToResponse(order);
    List<OrderHistoryResponse> orderHistories = lichSuHoaDonService.getOrderHistoriesByOrderId(id);
    orderResponse.setOrderHistories(orderHistories);
    return orderResponse;
  }

  @Override
  public OrderResponse placeOrder(OrderRequest orderRequest) throws Exception {
    HoaDon newOrder = new HoaDon();
    boolean checkCodeExists = false;
    String code;

    do {
      code = RandomCodeGenerator.generateRandomNumber();
      HoaDon findCodeOrder = hoaDonRepository.getOrderDetailsById(code);

      if (findCodeOrder == null) {
        checkCodeExists = false;
      } else {
        checkCodeExists = true;
      }
    } while (checkCodeExists);
    newOrder.setMa(code);
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
    orderHistory.setThaoTac("Đặt Hàng");
    orderHistory.setMoTa("Khách hàng đặt hàng");
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
      throw new RestApiException("Đơn hàng không tồn tại!");
    }
    if (req.getTrangThai().equals(OrderStatus.CANCELLED) && req.getOrderHistory().getMoTa().isBlank()) {
      throw new RestApiException("Bạn chưa nhập lý do hủy đơn hàng!");
    }
    if (req.getTrangThai().equals(OrderStatus.CANCELLED)) {
      if (orderCurrent.getTrangThai().equals(OrderStatus.DELIVERING)) {
        for (OrderItemResponse orderItem : orderCurrent.getOrderItems()) {
          Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                  findProductById(orderItem.getSanPhamChiTiet().getId());

          Set<Imei> imeisProduct = findProductItem.get().getImeis();
          orderItem.getImeisDaBan().forEach(s -> {
            imeisProduct.forEach(s1 -> {
              if (s1.getSoImei().equals(s.getSoImei())) {
                s1.setTrangThai(StatusImei.NOT_SOLD);
              }
            });
            s.setTrangThai(StatusImei.CANCELLED);
            imeiDaBanCustomRepository.save(s);
          });
          findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
                  orderItem.getImeisDaBan().size());
          sanPhamChiTietRepository.save(findProductItem.get());
        }
      } else {
        for (OrderItemResponse orderItem : orderCurrent.getOrderItems()) {
          Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                  findProductById(orderItem.getSanPhamChiTiet().getId());
          Set<Imei> imeisProduct = findProductItem.get().getImeis();
          orderItem.getImeisDaBan().forEach(s -> {
            imeisProduct.forEach(s1 -> {
              if (s1.getSoImei().equals(s.getSoImei())) {
                s1.setTrangThai(StatusImei.NOT_SOLD);
              }
            });
            s.setTrangThai(StatusImei.CANCELLED);
            imeiDaBanCustomRepository.save(s);
          });
          sanPhamChiTietRepository.save(findProductItem.get());
        }
      }
    }
    if (req.getTrangThai().equals(OrderStatus.DELIVERING)) {
      for (OrderItemResponse orderItem : orderCurrent.getOrderItems()) {
        Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                findProductById(orderItem.getSanPhamChiTiet().getId());

        Set<Imei> imeisProduct = findProductItem.get().getImeis();
        orderItem.getImeisDaBan().forEach(s -> {
          imeisProduct.forEach(s1 -> {
            if (s1.getSoImei().equals(s.getSoImei())) {
              s1.setTrangThai(StatusImei.SOLD);
            }
          });
          s.setTrangThai(StatusImei.SOLD);
          imeiDaBanCustomRepository.save(s);
        });
        findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() -
                orderItem.getImeisDaBan().size());
        sanPhamChiTietRepository.save(findProductItem.get());
      }
    }
    orderCurrent.setTrangThai(req.getTrangThai());
    orderHistoryServiceImpl.save(req.getOrderHistory());
    HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    return orderConverter.convertEntityToResponse(updatedOrderCurrent);
  }

  @Override
  public OrderResponse createOrderPending() throws Exception {
    boolean checkCodeExists = false;
    String code;

    do {
      code = RandomCodeGenerator.generateRandomNumber();
      HoaDon findCodeOrder = hoaDonRepository.getOrderDetailsById(code);

      if (findCodeOrder == null) {
        checkCodeExists = false;
      } else {
        checkCodeExists = true;
      }
    } while (checkCodeExists);

    HoaDon newOrderPending = new HoaDon();
    newOrderPending.setMa(code);
    newOrderPending.setCreatedAt(new Date());
    newOrderPending.setTrangThai(OrderStatus.PENDING_PAYMENT);
    newOrderPending.setLoaiHoaDon(OrderType.AT_COUNTER);
    newOrderPending.setTongTien(BigDecimal.ZERO);

    GioHang cart = new GioHang();
    cart.setMa(gioHangRepository.getMaxEntityCodeByClass());
    GioHang createdCart = gioHangRepository.save(cart);
    newOrderPending.setCart(createdCart);
    HoaDon createdOrderPending = hoaDonRepository.save(newOrderPending);

    return orderConverter.convertEntityToResponse(createdOrderPending);
//    HoaDon newOrderPending = new HoaDon();
//    newOrderPending.setMa(hoaDonRepository.getMaxEntityCodeByClass());
//    newOrderPending.setCreatedAt(new Date());
//    newOrderPending.setTrangThai(OrderStatus.PENDING_PAYMENT);
//    newOrderPending.setLoaiHoaDon(OrderType.AT_COUNTER);
//    newOrderPending.setTongTien(new BigDecimal(0));
//
//    GioHang cart = new GioHang();
//    cart.setMa(gioHangRepository.getMaxEntityCodeByClass());
//    GioHang createdCart = gioHangRepository.save(cart);
//    newOrderPending.setCart(createdCart);
//    HoaDon createdOrderPending = hoaDonRepository.save(newOrderPending);
//    return orderConverter.convertEntityToResponse(createdOrderPending);

//    LichSuHoaDon orderHistory = new LichSuHoaDon();
//    orderHistory.setHoaDon(createdOrderPending);
//    orderHistory.setCreatedAt(new Date());
//    orderHistory.setThaoTac("Tạo Đơn Hàng");
//    orderHistory.setMoTa("Nhân viên tạo đơn cho khách");
//    orderHistory.setLoaiThaoTac(0);
//    lichSuHoaDonRepository.save(orderHistory);
  }

  @Override
  public OrderResponse updateOrPaymentOrderPending(OrderRequest req, String id) throws Exception {
    OrderResponse orderCurrent = getOrderPendingById(id);
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }

    if (req.getIsUpdateType()) {
      orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateSdt()) {
      orderCurrent.setSoDienThoai(req.getSoDienThoai());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateFullName()) {
      orderCurrent.setHoVaTen(req.getHoVaTen());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateEmail()) {
      orderCurrent.setEmail(req.getEmail());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }

    if (req.getIsPayment()) {
      orderCurrent.setCart(null);
      orderCurrent.setTrangThai(req.getTrangThai());
      orderCurrent.setTongTien(req.getTongTien());
      orderCurrent.setTongTienSauKhiGiam(req.getTongTienSauKhiGiam());
      orderCurrent.setTienThua(req.getTienThua());
      orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
      orderCurrent.setPhiShip(req.getPhiShip());
      orderCurrent.setKhachCanTra(req.getKhachCanTra());

      String uri = barcodeGenerator.generateBarcodeImageBase64Url(orderCurrent.getMa(), BarcodeFormat.QR_CODE);
      orderCurrent.setMaQrCode(uri);

      if (req.getLoaiHoaDon().equals(OrderType.AT_COUNTER)) {
        orderCurrent.setTenNguoiNhan(null);
        orderCurrent.setSoDienThoaiNguoiNhan(null);
        orderCurrent.setDiaChiNguoiNhan(null);
        orderCurrent.setGhiChu(null);
        orderCurrent.setTinhThanhPhoNguoiNhan(null);
        orderCurrent.setXaPhuongNguoiNhan(null);
        orderCurrent.setQuanHuyenNguoiNhan(null);
      }

      HoaDon paymentOrder = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      if (req.getCart() != null) {
        CartRequest cartRequest = req.getCart();
        for (CartItemResponse cartItem : cartRequest.getCartItems()) {
          HoaDonChiTiet orderItem = new HoaDonChiTiet();
          orderItem.setHoaDon(paymentOrder);
          orderItem.setSanPhamChiTiet(productItemConverter.convertResponseToEntity(cartItem.getSanPhamChiTiet()));
          orderItem.setDonGia(cartItem.getDonGia());
          orderItem.setSoLuong(cartItem.getSoLuong());
//          orderItem.setDonGiaSauGiam();
          HoaDonChiTiet createdOrderItem = orderItemRepository.save(orderItem);

          Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                  findProductById(cartItem.getSanPhamChiTiet().getId());
          if (paymentOrder.getLoaiHoaDon().equals(OrderType.AT_COUNTER)) {
            findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho()
                    - cartItem.getImeisChuaBan().size());
          }
          Set<Imei> imeisProduct = findProductItem.get().getImeis();
          cartItem.getImeisChuaBan().forEach((s) -> {
            ImeiDaBan imeiDaBan = new ImeiDaBan();
            imeiDaBan.setHoaDonChiTiet(createdOrderItem);
            imeiDaBan.setSoImei(s.getSoImei());
            imeiDaBan.setTrangThai(paymentOrder.getLoaiHoaDon().equals(OrderType.AT_COUNTER) ? StatusImei.SOLD : StatusImei.PENDING_DELIVERY);
            imeiDaBanCustomRepository.save(imeiDaBan);

            imeisProduct.forEach((i) -> {
              if (s.getSoImei().equals(i.getSoImei())) {
                i.setTrangThai(paymentOrder.getLoaiHoaDon().equals(OrderType.AT_COUNTER) ? StatusImei.SOLD : StatusImei.PENDING_DELIVERY);
              }
            });
          });
          imeiChuaBanCustomRepository.deleteAll(imeiNotSoldConverter.convertToListEntity(cartItem.getImeisChuaBan()));
        }
        gioHangService.deleteById(req.getCart().getId());
      }

      if (req.getOrderHistories() != null) {
        List<OrderHistoryRequest> sortOrderHistory = req.getOrderHistories();
        sortOrderHistory.sort((e1, e2) ->
                e1.getStt() - e2.getStt()
        );
        lichSuHoaDonCustomRepository.saveAll(orderHistoryConverter.convertListRequestToListEntity(sortOrderHistory));
//        orderHistoryServiceImpl.save(req.getOrderHistory());
      }

      List<HoaDon> ordersPending = hoaDonRepository.getOrdersPending();
      if (ordersPending.isEmpty()) {
        createOrderPending();
      }
      return orderConverter.convertEntityToResponse(paymentOrder);

    } else if (req.getIsUpdateAccount()) {
      if (req.getAccount().getId() != null) {
        orderCurrent.setAccount(accountConverter.convertRequestToResponse(req.getAccount()));
      } else {
        orderCurrent.setAccount(null);
      }
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateInfoShip()) {
      if (req.getTinhThanhPhoNguoiNhan() != null) {
        orderCurrent.setTinhThanhPhoNguoiNhan(req.getTinhThanhPhoNguoiNhan());
        orderCurrent.setQuanHuyenNguoiNhan(null);
        orderCurrent.setXaPhuongNguoiNhan(null);
      }
      if (req.getQuanHuyenNguoiNhan() != null) {
        orderCurrent.setQuanHuyenNguoiNhan(req.getQuanHuyenNguoiNhan());
        orderCurrent.setXaPhuongNguoiNhan(null);
      }
      if (req.getXaPhuongNguoiNhan() != null) {
        orderCurrent.setXaPhuongNguoiNhan(req.getXaPhuongNguoiNhan());
      }
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);

    } else if (req.getIsUpdateInfoShipByCustomer()) {
      orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
      orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
      orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
//      orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
//      orderCurrent.setPhiShip(req.getPhiShip());
      if (req.getTinhThanhPhoNguoiNhan() != null) {
        orderCurrent.setTinhThanhPhoNguoiNhan(req.getTinhThanhPhoNguoiNhan());
        orderCurrent.setQuanHuyenNguoiNhan(null);
        orderCurrent.setXaPhuongNguoiNhan(null);
      }
      if (req.getQuanHuyenNguoiNhan() != null) {
        orderCurrent.setQuanHuyenNguoiNhan(req.getQuanHuyenNguoiNhan());
        orderCurrent.setXaPhuongNguoiNhan(null);
      }
      if (req.getXaPhuongNguoiNhan() != null) {
        orderCurrent.setXaPhuongNguoiNhan(req.getXaPhuongNguoiNhan());
      }
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);

    } else if (req.getIsUpdateNameShip()) {
      orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdatePhoneShip()) {
      orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateNoteShip()) {
      orderCurrent.setGhiChu(req.getGhiChu());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateAddressShip()) {
      orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateVoucher()) {
      if (req.getVoucher().getId() == null) {
        Optional<Voucher> findVoucher = voucherRepository.findById(orderCurrent.getVoucher().getId());
        if (findVoucher.isPresent()) {
          findVoucher.get().setSoLuong(findVoucher.get().getSoLuong() + 1);
        }
        orderCurrent.setVoucher(null);
      } else {
        Optional<Voucher> findVoucher = voucherRepository.findById(req.getVoucher().getId());
        if (findVoucher.isPresent()) {
          findVoucher.get().setSoLuong(findVoucher.get().getSoLuong() - 1);
        }
        orderCurrent.setVoucher(voucherConverter.convertRequestToResponse(req.getVoucher()));
      }

      HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    return orderCurrent;

  }

  @Override
  public List<OrderResponse> getOrdersPending() throws Exception {
    List<HoaDon> orders = hoaDonRepository.getOrdersPending();
    if (orders.isEmpty()) {
      this.createOrderPending();
      List<HoaDon> ordersDefault = hoaDonRepository.getOrdersPending();
      return orderConverter.convertToListResponse(ordersDefault);
    }
    return orderConverter.convertToListResponse(orders);
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
    try {
      HoaDon convertOrder = orderConverter.convertResponseToEntity(getOrder);
//      List<SanPhamChiTiet> productItemsToUpdate = new ArrayList<>();
      for (GioHangChiTiet cartItem : convertOrder.getCart().getCartItems()) {
        Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                findProductById(cartItem.getSanPhamChiTiet().getId());
        Set<Imei> imeisProduct = findProductItem.get().getImeis();
        for (ImeiChuaBan imeiChuaBan : cartItem.getImeisChuaBan()) {
          imeisProduct.forEach((s) -> {
            if (imeiChuaBan.getSoImei().equals(s.getSoImei())) {
              s.setTrangThai(StatusImei.NOT_SOLD);
            }
          });
        }
        imeiChuaBanCustomRepository.deleteAll(cartItem.getImeisChuaBan());
//        SanPhamChiTiet productItem = cartItem.getSanPhamChiTiet();
//        productItem.setSoLuongTonKho(productItem.getSoLuongTonKho() + cartItem.getSoLuong());
//        productItemsToUpdate.add(productItem);
      }
      this.deleteById(getOrder.getId());
//      sanPhamChiTietRepository.saveAll(productItemsToUpdate);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

}
