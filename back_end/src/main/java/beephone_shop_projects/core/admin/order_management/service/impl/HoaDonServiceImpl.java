package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.CustomKhachHangRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.converter.AccountConverter;
import beephone_shop_projects.core.admin.order_management.converter.ImeiNotSoldConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderCustomConverter;
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
import beephone_shop_projects.core.admin.order_management.model.response.OrderPaginationCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.ImeiChuaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiDaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.OrderItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.OrderJpaCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.HoaDonService;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.entity.Account;
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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HoaDonServiceImpl extends AbstractServiceImpl<HoaDon, OrderResponse, OrderRequest, String> implements HoaDonService {

  @Autowired
  private OrderRepositoryImpl hoaDonRepository;

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private LichSuHoaDonServiceImpl orderHistoryServiceImpl;

  @Autowired
  private OrderJpaCustomRepository orderJpaCustomRepository;

  @Autowired
  private LichSuHoaDonRepositoryImpl lichSuHoaDonRepository;

  @Autowired
  private CartRepositoryImpl gioHangRepository;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private OrderConverter orderConverter;

  @Autowired
  private OrderCustomConverter orderCustomConverter;

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

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private CustomKhachHangRepositoryImpl customKhachHangRepository;

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
  public Page<OrderPaginationCustomResponse> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilter) throws Exception {
    if (searchFilter.getKeyword() == null) {
      searchFilter.setKeyword("");
    }
    if (searchFilter.getCurrentPage() == null) {
      searchFilter.setCurrentPage(1);
    }
    if (searchFilter.getPageSize() == null) {
      searchFilter.setPageSize(10);
    }

    Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize());
    Page<OrderPaginationCustomResponse> orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
    while (orders.isEmpty() && pageable.getPageNumber() > 0) {
      pageable = pageable.previousOrFirst();
      orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
    }
    return orders;
//    return orderCustomConverter.convertToPageResponse(orders);
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
      if (orderCurrent.getTrangThai().equals(OrderStatus.CONFIRMED) || orderCurrent.getTrangThai().equals(OrderStatus.DELIVERING) || orderCurrent.getTrangThai().equals(OrderStatus.PENDING_CONFIRM)) {
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
      }
    }
    if (req.getTrangThai().equals(OrderStatus.CONFIRMED)) {
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
//        if (orderCurrent.getLoaiHoaDon().equals(OrderType.CLIENT)){
//          findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() -
//                  orderItem.getImeisDaBan().size());
//        }
        sanPhamChiTietRepository.save(findProductItem.get());
      }
    }
    orderCurrent.setTrangThai(req.getTrangThai());
    orderHistoryServiceImpl.save(req.getOrderHistory());
    HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    return orderConverter.convertEntityToResponse(updatedOrderCurrent);
  }

  @Override
  public OrderResponse createOrderPending(String user) throws Exception {
    List<OrderResponse> orders = this.getOrdersPending();
    if (orders.size() >= 6) {
      throw new RestApiException("Tối đa 6 tab đơn hàng");
    } else {
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

//      LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
//      lichSuHoaDon.setCreatedBy(user);
//      lichSuHoaDon.setCreatedAt(new Date());
//      lichSuHoaDon.setMoTa("Nhân viên tạo đơn cho khách hàng");
//      lichSuHoaDon.setHoaDon(createdOrderPending);
//      lichSuHoaDon.setLoaiThaoTac(0);
//      lichSuHoaDon.setThaoTac("Tạo Đơn Hàng");
//      lichSuHoaDonRepository.save(lichSuHoaDon);

      return orderConverter.convertEntityToResponse(createdOrderPending);
    }
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

  }

  @Override
  public OrderResponse updateOrPaymentOrderPending(OrderRequest req, String id) throws Exception {

    HoaDon orderCurrent = hoaDonRepository.getOrderPendingById(id);
//    OrderResponse orderResponse = this.getOrderPendingById(id);
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }

    if (req.getIsUpdateType()) {
      orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateSdt()) {
      orderCurrent.setSoDienThoai(req.getSoDienThoai());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateFullName()) {
      orderCurrent.setHoVaTen(req.getHoVaTen());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    if (req.getIsUpdateEmail()) {
      orderCurrent.setEmail(req.getEmail());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
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
      orderCurrent.setHoVaTen(req.getHoVaTen());
      orderCurrent.setEmail(req.getEmail());
      orderCurrent.setSoDienThoai(req.getSoDienThoai());
      String uri = barcodeGenerator.generateBarcodeImageBase64Url(orderCurrent.getMa(), BarcodeFormat.QR_CODE);
      orderCurrent.setMaQrCode(uri);

      if (req.getEmployee().getId() != null) {
        Account findAccount = customKhachHangRepository.getAccountById(req.getEmployee().getId());
        if (findAccount != null) {
          orderCurrent.setAccountEmployee(findAccount);
        } else {
          throw new RestApiException("Account nhân viên không tồn tại!");
        }
//        Account accountEmp = new Account();
//        accountEmp.setId(req.getEmployee().getId());
      }

      if (req.getLoaiHoaDon().equals(OrderType.AT_COUNTER)) {
        orderCurrent.setTenNguoiNhan(null);
        orderCurrent.setSoDienThoaiNguoiNhan(null);
        orderCurrent.setDiaChiNguoiNhan(null);
        orderCurrent.setGhiChu(null);
        orderCurrent.setTinhThanhPhoNguoiNhan(null);
        orderCurrent.setXaPhuongNguoiNhan(null);
        orderCurrent.setQuanHuyenNguoiNhan(null);
      }

      HoaDon paymentOrder = orderJpaCustomRepository.save(orderCurrent);
      if (req.getCart() != null) {
        CartRequest cartRequest = req.getCart();
        for (CartItemResponse cartItem : cartRequest.getCartItems()) {
          HoaDonChiTiet orderItem = new HoaDonChiTiet();
          orderItem.setHoaDon(paymentOrder);
          orderItem.setSanPhamChiTiet(productItemConverter.convertResponseToEntity(cartItem.getSanPhamChiTiet()));
//          orderItem.setDonGia(cartItem.getDonGia());
          orderItem.setSoLuong(cartItem.getSoLuong());
//          orderItem.setDonGiaSauGiam();
          HoaDonChiTiet createdOrderItem = orderItemRepository.save(orderItem);

          Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                  findProductById(cartItem.getSanPhamChiTiet().getId());
          if (orderCurrent.getLoaiHoaDon().equals(OrderType.DELIVERY)){
//            findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() + orderItem.getSoLuong());
          }
//          if (findProductItem.get().getDonGiaSauKhuyenMai().compareTo(BigDecimal.ZERO) != 0 && findProductItem.get().getDonGiaSauKhuyenMai() != null) {
//            orderItem.setDonGiaSauGiam(cartItem.getSanPhamChiTiet().getDonGiaSauKhuyenMai());
//            orderItem.setDonGia(cartItem.getDonGia());
//          } else {
            orderItem.setDonGia(cartItem.getDonGia());
//          }
          if (paymentOrder.getLoaiHoaDon().equals(OrderType.AT_COUNTER)) {
//            findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho()
//                    - cartItem.getImeisChuaBan().size());
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
        List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonCustomRepository.saveAll(orderHistoryConverter.convertListRequestToListEntity(sortOrderHistory));

        lichSuHoaDons.forEach(s -> {
          if (s.getLoaiThaoTac() == 0 && (s.getThaoTac().equals("Tạo Đơn Hàng"))) {
            Optional<LichSuHoaDon> findLichSuHoaDon = lichSuHoaDonCustomRepository.findById(s.getId());
            if (findLichSuHoaDon.isPresent()) {
              s.setCreatedAt(orderCurrent.getCreatedAt());
              lichSuHoaDonCustomRepository.save(findLichSuHoaDon.get());
            }
          }
        });
        lichSuHoaDons.forEach(s -> {
        if (s.getLoaiThaoTac() == 0 && (s.getThaoTac().equals("Đặt Hàng Thành Công"))) {
          orderCurrent.setCreatedAt(s.getCreatedAt());
          orderJpaCustomRepository.save(orderCurrent);
        }
      });

//        orderHistoryServiceImpl.save(req.getOrderHistory());
      }

      List<HoaDon> ordersPending = hoaDonRepository.getOrdersPending();
      if (ordersPending.isEmpty()) {
        createOrderPending(req.getCreatedBy());
      }
      return orderConverter.convertEntityToResponse(paymentOrder);

    } else if (req.getIsUpdateAccount()) {
      if (req.getAccount().getId() != null) {
        Account findAccount = customKhachHangRepository.getAccountById(req.getAccount().getId());
        if (findAccount != null) {
          orderCurrent.setAccount(findAccount);
        } else {
          throw new RestApiException("Account không tồn tại!");
        }
      } else {
        orderCurrent.setAccount(null);
      }
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
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
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);

    } else if (req.getIsUpdateInfoShipByCustomer()) {
      orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
      orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
      orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
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
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);

    } else if (req.getIsUpdateNameShip()) {
      orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdatePhoneShip()) {
      orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateNoteShip()) {
      orderCurrent.setGhiChu(req.getGhiChu());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    } else if (req.getIsUpdateAddressShip()) {
      orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
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
        orderCurrent.setVoucher(findVoucher.get());
      }

      HoaDon updateOrderPending = orderJpaCustomRepository.save(orderCurrent);
      return orderConverter.convertEntityToResponse(updateOrderPending);
    }
    return orderConverter.convertEntityToResponse(orderCurrent);

  }

  @Override
  public List<OrderResponse> getOrdersPending() throws Exception {
    List<HoaDon> orders = hoaDonRepository.getOrdersPending();
//    if (orders.isEmpty()) {
//      this.createOrderPending();
//      List<HoaDon> ordersDefault = hoaDonRepository.getOrdersPending();
//      return orderConverter.convertToListResponse(ordersDefault);
//    }
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
      List<SanPhamChiTiet> productItemsToUpdate = new ArrayList<>();
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
        Voucher voucher = convertOrder.getVoucher();
        if (voucher != null) {
          Optional<Voucher> findVoucher = voucherRepository.findById(voucher.getId());
          if (findVoucher.isPresent()) {
            voucher.setSoLuong(voucher.getSoLuong() + 1);
            voucherRepository.save(voucher);
          }
        }
        SanPhamChiTiet productItem = cartItem.getSanPhamChiTiet();
        productItem.setSoLuongTonKho(productItem.getSoLuongTonKho() + cartItem.getSoLuong());
        productItemsToUpdate.add(productItem);
      }
      this.deleteById(getOrder.getId());
      sanPhamChiTietRepository.saveAll(productItemsToUpdate);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @Override
  public OrderResponse rollBackStatusOrder(OrderRequest req) throws Exception {
    OrderResponse orderCurrent = getOrderDetailsById(req.getId());
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }

    if (req.getOrderHistory() != null) {
      if (req.getOrderHistory().getLoaiThaoTac() == 1) {
        for (OrderItemResponse orderItem : orderCurrent.getOrderItems()) {
          Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
                  findProductById(orderItem.getSanPhamChiTiet().getId());
          Set<Imei> imeisProduct = findProductItem.get().getImeis();
          orderItem.getImeisDaBan().forEach(s -> {
            imeisProduct.forEach(s1 -> {
              if (s1.getSoImei().equals(s.getSoImei())) {
                s1.setTrangThai(StatusImei.PENDING_DELIVERY);
              }
            });
            s.setTrangThai(StatusImei.PENDING_DELIVERY);
            imeiDaBanCustomRepository.save(s);
          });
//          findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
//                  orderItem.getImeisDaBan().size());
//          sanPhamChiTietRepository.save(findProductItem.get());
        }
      }
    }
    if (req.getStatusOrder().equals("Chờ xác nhận")) {
      orderCurrent.setTrangThai(OrderStatus.PENDING_CONFIRM);
    } else if (req.getStatusOrder().equals("Chờ giao hàng")) {
      orderCurrent.setTrangThai(OrderStatus.CONFIRMED);
    } else if (req.getStatusOrder().equals("Đang giao hàng")) {
      orderCurrent.setTrangThai(OrderStatus.DELIVERING);
    }
    HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
    lichSuHoaDon.setCreatedBy(req.getCreatedBy());
    lichSuHoaDon.setCreatedAt(new Date());
    lichSuHoaDon.setMoTa("Hoàn tác trạng thái đơn hàng. " + req.getNote());
    lichSuHoaDon.setHoaDon(updatedOrderCurrent);
    lichSuHoaDon.setLoaiThaoTac(8);
    lichSuHoaDon.setThaoTac("Hoàn Tác");
    lichSuHoaDonRepository.save(lichSuHoaDon);
    return orderConverter.convertEntityToResponse(updatedOrderCurrent);
  }

  @Override
  public OrderResponse updateInfoOrderDelivery(OrderRequest req) throws Exception {
    OrderResponse orderCurrent = getOrderDetailsById(req.getId());
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }

    BigDecimal phiShipCu = orderCurrent.getPhiShip();
    BigDecimal khachCanTraCu = orderCurrent.getKhachCanTra();
    BigDecimal khachCanTraMoi = khachCanTraCu.subtract(phiShipCu);

    orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
    orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
    orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
    orderCurrent.setPhiShip(req.getPhiShip());
    orderCurrent.setTinhThanhPhoNguoiNhan(req.getTinhThanhPhoNguoiNhan());
    orderCurrent.setQuanHuyenNguoiNhan(req.getQuanHuyenNguoiNhan());
    orderCurrent.setXaPhuongNguoiNhan(req.getXaPhuongNguoiNhan());
    orderCurrent.setKhachCanTra(khachCanTraMoi.add(req.getPhiShip()));

    HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
    lichSuHoaDon.setCreatedBy(req.getCreatedBy());
    lichSuHoaDon.setCreatedAt(new Date());
    lichSuHoaDon.setMoTa("Cập nhật địa chỉ giao hàng. " + req.getGhiChu());
    lichSuHoaDon.setHoaDon(updatedOrderCurrent);
    lichSuHoaDon.setLoaiThaoTac(9);
    lichSuHoaDon.setThaoTac("Cập Nhật Đơn Hàng");
    lichSuHoaDonRepository.save(lichSuHoaDon);
    return orderConverter.convertEntityToResponse(updatedOrderCurrent);
  }

}
