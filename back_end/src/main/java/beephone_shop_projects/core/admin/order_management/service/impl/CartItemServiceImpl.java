package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartItemConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderItemConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ImeiCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderItemRefundRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderItemsCustomRefundRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiChuaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiDaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonRepository;
import beephone_shop_projects.core.admin.order_management.repository.OrderItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ImeiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.CartItemService;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.HoaDonChiTiet;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.ImeiDaBan;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl extends AbstractServiceImpl<GioHangChiTiet, CartItemResponse, CartItemRequest, String> implements CartItemService {
  @Autowired
  private VoucherRepository voucherRepository;

  @Autowired
  private CartItemRepositoryImpl cartItemRepository;

  @Autowired
  private HinhThucThanhToanCustomRepository hinhThucThanhToanCustomRepository;

  @Autowired
  private CartItemCustomRepository cartItemCustomRepository;

  @Autowired
  private ProductDetailRepository sanPhamChiTietRepository;

  @Autowired
  private CartRepositoryImpl cartRepository;

  @Autowired
  private CartItemConverter cartItemConverter;

  @Autowired
  private ImeiRepositoryImpl imeiRepository;

  @Autowired
  private OrderRepositoryImpl orderRepository;

  @Autowired
  private OrderConverter orderConverter;

  @Autowired
  private OrderItemRepository orderItemRepository;

  @Autowired
  private OrderItemConverter orderItemConverter;

  @Autowired
  private ImeiChuaBanCustomRepository imeiChuaBanCustomRepository;

  @Autowired
  private ImeiDaBanCustomRepository imeiDaBanCustomRepository;

  @Autowired
  private LichSuHoaDonRepository lichSuHoaDonRepository;

  @Autowired
  private ProductItemConverter productItemConverter;

  @Autowired
  private HinhThucThanhToanRepository hinhThucThanhToanRepository;

  @Autowired
  private ImeiCustomRepository imeiCustomRepository;

  public CartItemServiceImpl(CartItemRepository repo, CartItemConverter converter) {
    super(repo, converter);
  }

  @Override
  public CartItemResponse addProductItemToCart(CartItemRequest req) throws Exception {
    Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
            findProductById(req.getProductItem().getId());
    GioHang findCartCurrent = cartRepository.findOneById(req.getCart().getId());
    Optional<GioHangChiTiet> findProductItemCurrentInCart = cartItemRepository.
            findProductAlreadyExistInCart(req);
    if (findCartCurrent == null) {
      throw new RestApiException("Không tìm thấy giỏ hàng hiện tại!");
    }
    if (!findProductItem.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    int totalAmount = 0;
    for (GioHangChiTiet cartItem : findCartCurrent.getCartItems()) {
      totalAmount += cartItem.getSoLuong();
    }

    if (totalAmount + req.getImeis().size() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    if (findProductItemCurrentInCart.isPresent()) {
      Set<ImeiChuaBan> imeisInCart = findProductItemCurrentInCart.get().getImeisChuaBan();
      GioHangChiTiet getProductItemInCartCurrent = findProductItemCurrentInCart.get();
      getProductItemInCartCurrent.setSoLuong(getProductItemInCartCurrent
              .getSoLuong() + req.getAmount());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
      GioHangChiTiet updatedCartItem = cartItemRepository.save(getProductItemInCartCurrent);

      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiCustomRequest imeiCustomRequest : req.getImeis()) {
        imeisProduct.forEach((s) -> {
          if (imeiCustomRequest.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.IN_THE_CART);
          }
        });
      }
      for (ImeiCustomRequest imei : req.getImeis()) {
        ImeiChuaBan imeiChuaBan = new ImeiChuaBan();
        imeiChuaBan.setSoImei(imei.getSoImei());
        imeiChuaBan.setTrangThai(StatusImei.IN_THE_CART);
        imeiChuaBan.setGioHangChiTiet(updatedCartItem);
        imeiChuaBanCustomRepository.save(imeiChuaBan);
      }
      return cartItemConverter.convertEntityToResponse(updatedCartItem);
    } else {
      GioHangChiTiet cartItem = new GioHangChiTiet();
      cartItem.setSoLuong(req.getAmount());
      cartItem.setSanPhamChiTiet(findProductItem.get());
      cartItem.setGioHang(findCartCurrent);
      cartItem.setDonGia(req.getPrice());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
      GioHangChiTiet createdCartItem = cartItemRepository.save(cartItem);

      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiCustomRequest imeiCustomRequest : req.getImeis()) {
        imeisProduct.forEach((s) -> {
          if (imeiCustomRequest.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.IN_THE_CART);
          }
        });
      }
      for (ImeiCustomRequest imei : req.getImeis()) {
        ImeiChuaBan imeiChuaBan = new ImeiChuaBan();
        imeiChuaBan.setSoImei(imei.getSoImei());
        imeiChuaBan.setTrangThai(StatusImei.IN_THE_CART);
        imeiChuaBan.setGioHangChiTiet(createdCartItem);
        imeiChuaBanCustomRepository.save(imeiChuaBan);
      }

      return cartItemConverter.convertEntityToResponse(createdCartItem);
    }

  }

  @Override
  public CartItemResponse addProductItemToCartByScanner(CartItemRequest req) throws Exception {
    GioHang findCartCurrent = cartRepository.findOneById(req.getCart().getId());
    Optional<Imei> findImei = imeiCustomRepository.findImeiBySoImei(req.getImei());
    if (findCartCurrent == null) {
      throw new RestApiException("Không tìm thấy giỏ hàng hiện tại!");
    }

    if (!findImei.isPresent()) {
      throw new RestApiException("Imei không tồn tại!");
    }

    if (findImei.get().getTrangThai().equals(StatusImei.IN_THE_CART)) {
      throw new RestApiException("Imei đang được chọn trong giỏ hàng!");
    } else if (!findImei.get().getTrangThai().equals(StatusImei.NOT_SOLD)) {
      throw new RestApiException("Imei không khả dụng!");
    }

    int totalAmount = 0;
    for (GioHangChiTiet cartItem : findCartCurrent.getCartItems()) {
      totalAmount += cartItem.getSoLuong();
    }

    if (totalAmount + req.getAmount() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    Optional<GioHangChiTiet> findProductItemCurrentInCart = cartItemCustomRepository.
            findCartItemAlready(findImei.get().getSanPhamChiTiet().getId(), findCartCurrent.getId());
    SanPhamChiTiet sanPhamChiTiet = findImei.get().getSanPhamChiTiet();

    if (findProductItemCurrentInCart.isPresent()) {
//      List<ImeiChuaBan> imeisInCart = findProductItemCurrentInCart.get().getImeisChuaBan();
//      for (ImeiChuaBan imeiChuaBan : imeisInCart){
//        if (imeiChuaBan.getSoImei().equals(req.getImei())){
//        }
//      }
      GioHangChiTiet getProductItemInCartCurrent = findProductItemCurrentInCart.get();
      getProductItemInCartCurrent.setSoLuong(getProductItemInCartCurrent
              .getSoLuong() + req.getAmount());
      sanPhamChiTiet.setSoLuongTonKho(sanPhamChiTiet.getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(sanPhamChiTiet);
      GioHangChiTiet updatedCartItem = cartItemRepository.save(getProductItemInCartCurrent);

      findImei.get().setTrangThai(StatusImei.IN_THE_CART);
      imeiRepository.save(findImei.get());

      ImeiChuaBan imeiChuaBan = new ImeiChuaBan();
      imeiChuaBan.setSoImei(req.getImei());
      imeiChuaBan.setTrangThai(StatusImei.IN_THE_CART);
      imeiChuaBan.setGioHangChiTiet(updatedCartItem);
      imeiChuaBanCustomRepository.save(imeiChuaBan);
      return cartItemConverter.convertEntityToResponse(updatedCartItem);
    } else {
      GioHangChiTiet cartItem = new GioHangChiTiet();
      cartItem.setSoLuong(req.getAmount());
      cartItem.setSanPhamChiTiet(findImei.get().getSanPhamChiTiet());
      cartItem.setGioHang(findCartCurrent);
      cartItem.setDonGia(findImei.get().getSanPhamChiTiet().getDonGia());
      sanPhamChiTiet.setSoLuongTonKho(sanPhamChiTiet.getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(sanPhamChiTiet);
      GioHangChiTiet createdCartItem = cartItemRepository.save(cartItem);

      findImei.get().setTrangThai(StatusImei.IN_THE_CART);
      imeiRepository.save(findImei.get());
      ImeiChuaBan imeiChuaBan = new ImeiChuaBan();
      imeiChuaBan.setSoImei(req.getImei());
      imeiChuaBan.setTrangThai(StatusImei.IN_THE_CART);
      imeiChuaBan.setGioHangChiTiet(createdCartItem);
      imeiChuaBanCustomRepository.save(imeiChuaBan);

      return cartItemConverter.convertEntityToResponse(createdCartItem);
    }

  }

  @Override
  public boolean removeCartItemById(String id) throws Exception {
    GioHangChiTiet findCartItem = cartItemRepository.findOneById(id);
    Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
            findProductById(findCartItem.getSanPhamChiTiet().getId());

    if (findCartItem == null) {
      throw new RestApiException("Không tìm thấy sản phẩm này trong giỏ hàng!");
    }
    if (!findProductItem.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    try {
      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiChuaBan imei : findCartItem.getImeisChuaBan()) {
        imeisProduct.forEach((s) -> {
          if (imei.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.NOT_SOLD);
          }
        });
      }
      Integer resetAmount = findCartItem.getSoLuong();
      imeiChuaBanCustomRepository.deleteAll(findCartItem.getImeisChuaBan());
      cartItemRepository.deleteById(findCartItem.getId());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
              resetAmount);
      sanPhamChiTietRepository.save(findProductItem.get());
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @Override
  public CartItemResponse updateAmountItemInCart(CartItemRequest req) throws Exception {
    GioHang findCartCurrent = cartRepository.findOneById(req.getCart().getId());
    GioHangChiTiet findCartItem = cartItemRepository.findOneById(req.getId());
    Optional<SanPhamChiTiet> getProductItemInCartItem = sanPhamChiTietRepository.findProductById(findCartItem.getSanPhamChiTiet().getId());

    if (findCartCurrent == null) {
      throw new RestApiException("Không tìm thấy giỏ hàng hiện tại!");
    }
    if (findCartItem == null) {
      throw new RestApiException("Không tìm thấy sản phẩm này trong giỏ hàng!");
    }
    if (getProductItemInCartItem == null) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    SanPhamChiTiet getOptional = getProductItemInCartItem.get();
    List<ImeiCustomRequest> imeiFromRequest = req.getImeis();
    Set<ImeiChuaBan> imeiCurrentInCart = findCartItem.getImeisChuaBan();
    Set<String> currentImeis = imeiCurrentInCart.stream()
            .map(ImeiChuaBan::getSoImei)
            .collect(Collectors.toSet());

    List<ImeiChuaBan> imeiToAdd = imeiFromRequest.stream()
            .filter(imei -> !currentImeis.contains(imei.getSoImei()))
            .map(imei -> {
              ImeiChuaBan newImei = new ImeiChuaBan();
              newImei.setSoImei(imei.getSoImei());
              newImei.setTrangThai(StatusImei.IN_THE_CART);
              newImei.setGioHangChiTiet(findCartItem);
              return newImei;
            })
            .collect(Collectors.toList());

    int totalAmount = 0;
    for (GioHangChiTiet cartItem : findCartCurrent.getCartItems()) {
      totalAmount += cartItem.getSoLuong();
    }

    if (totalAmount + req.getImeis().size() - imeiCurrentInCart.size() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    List<ImeiChuaBan> imeiToRemove = imeiCurrentInCart.stream()
            .filter(imei -> !imeiFromRequest.stream()
                    .anyMatch(item -> item.getSoImei().equals(imei.getSoImei())))
            .collect(Collectors.toList());

    Set<Imei> imeisProduct = getOptional.getImeis();
    for (ImeiChuaBan imeiChuaBan : imeiToAdd) {
      imeisProduct.forEach((s) -> {
        if (imeiChuaBan.getSoImei().equals(s.getSoImei())) {
          s.setTrangThai(StatusImei.IN_THE_CART);
        }
      });
    }
    for (ImeiChuaBan imeiChuaBan : imeiToRemove) {
      imeisProduct.forEach((s) -> {
        if (imeiChuaBan.getSoImei().equals(s.getSoImei())) {
          s.setTrangThai(StatusImei.NOT_SOLD);
        }
      });
    }
    getOptional.setSoLuongTonKho(getOptional.getSoLuongTonKho() + findCartItem.getSoLuong() - req.getAmount());
    findCartItem.setSoLuong(req.getAmount());
    GioHangChiTiet updatedCartItem = cartItemRepository.save(findCartItem);


//    imeiCurrentInCart.addAll(imeiToAdd);
//    imeiCurrentInCart.removeAll(imeiToRemove);
    imeiChuaBanCustomRepository.deleteAll(imeiToRemove);
    imeiChuaBanCustomRepository.saveAll(imeiToAdd);

    sanPhamChiTietRepository.save(getOptional);
    return null;

  }

  @Override
  public OrderItemResponse addProductItemToCartOrder(OrderItemRequest req) throws Exception {
    Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
            findProductById(req.getProductItem().getId());
    HoaDon findOrderCurrent = orderRepository.findOneById(req.getOrder().getId());
    Optional<HoaDonChiTiet> findProductItemCurrentInCartOrder = orderItemRepository.
            findProductAlreadyExistInCartItemOrder(req.getProductItem().getId(), req.getOrder().getId());
    if (findOrderCurrent == null) {
      throw new RestApiException("Không tìm thấy đơn hàng hiện tại!");
    }
    if (!findProductItem.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    int totalAmount = 0;
    for (HoaDonChiTiet orderItem : findOrderCurrent.getOrderItems()) {
      totalAmount += orderItem.getSoLuong();
    }

    if (totalAmount + req.getImeis().size() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    if (findProductItemCurrentInCartOrder.isPresent()) {
      Set<ImeiDaBan> imeisInCartOrder = findProductItemCurrentInCartOrder.get().getImeisDaBan();
      HoaDonChiTiet getProductItemInCartOrderCurrent = findProductItemCurrentInCartOrder.get();
      Integer totalAmountFinal = getProductItemInCartOrderCurrent.getSoLuong() + req.getAmount();
      LichSuHoaDon orderHistory = new LichSuHoaDon();
      orderHistory.setHoaDon(findOrderCurrent);
      orderHistory.setCreatedAt(new Date());
      orderHistory.setCreatedBy(req.getUser());
      orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
      orderHistory.setMoTa("Đã cập nhật số lượng mua của sản phẩm [" + req.getProductName() + "] từ [" + getProductItemInCartOrderCurrent.getSoLuong() + "] thành [" + totalAmountFinal + "].");
      orderHistory.setLoaiThaoTac(9);
      lichSuHoaDonRepository.save(orderHistory);

      getProductItemInCartOrderCurrent.setSoLuong(getProductItemInCartOrderCurrent
              .getSoLuong() + req.getAmount());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
      HoaDonChiTiet updatedCartItemOrder = orderItemRepository.save(getProductItemInCartOrderCurrent);
      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiCustomRequest imeiCustomRequest : req.getImeis()) {
        imeisProduct.forEach((s) -> {
          if (imeiCustomRequest.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.PENDING_DELIVERY);
          }
        });
      }
      for (ImeiCustomRequest imei : req.getImeis()) {
        ImeiDaBan imeiDaBan = new ImeiDaBan();
        imeiDaBan.setSoImei(imei.getSoImei());
        imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
        imeiDaBan.setHoaDonChiTiet(updatedCartItemOrder);
        imeiDaBanCustomRepository.save(imeiDaBan);
      }

      if (findOrderCurrent.getTongTien() != null) {
        BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
        BigDecimal amount = new BigDecimal(req.getAmount());
        findOrderCurrent.setTongTien(tongTienCurrent.add(req.getPrice().multiply(amount)));

        if (findOrderCurrent.getKhachCanTra() != null) {
          BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
          findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(req.getPrice().multiply(amount)));
        }

        if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
          BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
          findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(req.getPrice().multiply(amount)));
        }
        orderRepository.save(findOrderCurrent);
      }

      return orderItemConverter.convertEntityToResponse(updatedCartItemOrder);
    } else {
      HoaDonChiTiet orderItem = new HoaDonChiTiet();
      orderItem.setSoLuong(req.getAmount());
      orderItem.setSanPhamChiTiet(findProductItem.get());
      orderItem.setHoaDon(findOrderCurrent);
      orderItem.setDonGia(req.getPrice());
//      if (findOrderCurrent.getLoaiHoaDon().equals(OrderType.DELIVERY)){
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
//      }
      HoaDonChiTiet createdOrderItem = orderItemRepository.save(orderItem);

      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiCustomRequest imeiCustomRequest : req.getImeis()) {
        imeisProduct.forEach((s) -> {
          if (imeiCustomRequest.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.PENDING_DELIVERY);
          }
        });
      }
      for (ImeiCustomRequest imei : req.getImeis()) {
        ImeiDaBan imeiDaBan = new ImeiDaBan();
        imeiDaBan.setSoImei(imei.getSoImei());
        imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
        imeiDaBan.setHoaDonChiTiet(createdOrderItem);
        imeiDaBanCustomRepository.save(imeiDaBan);
      }

      if (findOrderCurrent.getTongTien() != null) {
        BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
        BigDecimal amount = new BigDecimal(req.getAmount());
        findOrderCurrent.setTongTien(tongTienCurrent.add(req.getPrice().multiply(amount)));

        if (findOrderCurrent.getKhachCanTra() != null) {
          BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
          findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(req.getPrice().multiply(amount)));
        }

        if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
          BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
          findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(req.getPrice().multiply(amount)));
        }
        orderRepository.save(findOrderCurrent);
        LichSuHoaDon orderHistory = new LichSuHoaDon();
        orderHistory.setHoaDon(findOrderCurrent);
        orderHistory.setCreatedAt(new Date());
        orderHistory.setCreatedBy(req.getUser());
        orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
        orderHistory.setMoTa("Đã thêm sản phẩm [" + req.getProductName() + "] với số lượng [" + req.getAmount() + "].");
        orderHistory.setLoaiThaoTac(9);
        lichSuHoaDonRepository.save(orderHistory);
      }
      return orderItemConverter.convertEntityToResponse(createdOrderItem);
    }
  }

  @Override
  public OrderItemResponse addProductItemToCartOrderByScanner(OrderItemRequest req) throws Exception {
    HoaDon findOrderCurrent = orderRepository.findOneById(req.getOrder().getId());
    Optional<Imei> findImei = imeiCustomRepository.findImeiBySoImei(req.getImei());
    if (findOrderCurrent == null) {
      throw new RestApiException("Không tìm thấy đơn hàng!");
    }
    if (!findImei.isPresent()) {
      throw new RestApiException("Imei không tồn tại!");
    }
    if (!findImei.get().getTrangThai().equals(StatusImei.NOT_SOLD)
            && !findImei.get().getTrangThai().equals(StatusImei.PENDING_DELIVERY)) {
      throw new RestApiException("Imei không khả dụng!");
    }

    int totalAmount = 0;
    for (HoaDonChiTiet orderItem : findOrderCurrent.getOrderItems()) {
      totalAmount += orderItem.getSoLuong();
    }

    if (totalAmount + req.getAmount() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    SanPhamChiTiet sanPhamChiTiet = findImei.get().getSanPhamChiTiet();

    Optional<HoaDonChiTiet> findProductItemCurrentInCartOrder = orderItemRepository.
            findProductAlreadyExistInCartItemOrder(findImei.get().getSanPhamChiTiet().getId(), req.getOrder().getId());

    if (findProductItemCurrentInCartOrder.isPresent()) {
      Set<ImeiDaBan> imeisInCart = findProductItemCurrentInCartOrder.get().getImeisDaBan();
      for (ImeiDaBan imeiDaBan : imeisInCart) {
        if (imeiDaBan.getSoImei().equals(req.getImei())) {
          throw new RestApiException("Imei đang được chọn trong đơn hàng!");
        }
      }
      HoaDonChiTiet getProductItemInCartOrderCurrent = findProductItemCurrentInCartOrder.get();
      Integer totalAmountFinal = getProductItemInCartOrderCurrent.getSoLuong() + req.getAmount();
      LichSuHoaDon orderHistory = new LichSuHoaDon();
      orderHistory.setHoaDon(findOrderCurrent);
      orderHistory.setCreatedAt(new Date());
      orderHistory.setCreatedBy(req.getUser());
      orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
      orderHistory.setMoTa("Đã cập nhật số lượng mua của sản phẩm [" + req.getProductName() + "] từ [" + getProductItemInCartOrderCurrent.getSoLuong() + "] thành [" + totalAmountFinal + "].");
      orderHistory.setLoaiThaoTac(9);
      lichSuHoaDonRepository.save(orderHistory);

      getProductItemInCartOrderCurrent.setSoLuong(getProductItemInCartOrderCurrent
              .getSoLuong() + req.getAmount());
      sanPhamChiTiet.setSoLuongTonKho(sanPhamChiTiet.getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(sanPhamChiTiet);
      HoaDonChiTiet updatedCartItemOrder = orderItemRepository.save(getProductItemInCartOrderCurrent);
      findImei.get().setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiRepository.save(findImei.get());

      ImeiDaBan imeiDaBan = new ImeiDaBan();
      imeiDaBan.setSoImei(req.getImei());
      imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiDaBan.setHoaDonChiTiet(updatedCartItemOrder);
      imeiDaBanCustomRepository.save(imeiDaBan);

      if (findOrderCurrent.getTongTien() != null) {
        BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
        BigDecimal amount = new BigDecimal(req.getAmount());
        findOrderCurrent.setTongTien(tongTienCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));

        if (findOrderCurrent.getKhachCanTra() != null) {
          BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
          findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));
        }

        if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
          BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
          findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));
        }
        orderRepository.save(findOrderCurrent);
      }
      return orderItemConverter.convertEntityToResponse(updatedCartItemOrder);

    } else {
      HoaDonChiTiet orderItem = new HoaDonChiTiet();
      orderItem.setSoLuong(req.getAmount());
      orderItem.setSanPhamChiTiet(findImei.get().getSanPhamChiTiet());
      orderItem.setHoaDon(findOrderCurrent);
      orderItem.setDonGia(findImei.get().getSanPhamChiTiet().getDonGia());
//      if (findOrderCurrent.getLoaiHoaDon().equals(OrderType.DELIVERY)){
      sanPhamChiTiet.setSoLuongTonKho(sanPhamChiTiet.getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(sanPhamChiTiet);
//      }
      HoaDonChiTiet createdOrderItem = orderItemRepository.save(orderItem);
      findImei.get().setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiRepository.save(findImei.get());

      ImeiDaBan imeiDaBan = new ImeiDaBan();
      imeiDaBan.setSoImei(req.getImei());
      imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiDaBan.setHoaDonChiTiet(createdOrderItem);
      imeiDaBanCustomRepository.save(imeiDaBan);


      if (findOrderCurrent.getTongTien() != null) {
        BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
        BigDecimal amount = new BigDecimal(req.getAmount());
        findOrderCurrent.setTongTien(tongTienCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));

        if (findOrderCurrent.getKhachCanTra() != null) {
          BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
          findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));
        }

        if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
          BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
          findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(sanPhamChiTiet.getDonGia().multiply(amount)));
        }
        orderRepository.save(findOrderCurrent);
        LichSuHoaDon orderHistory = new LichSuHoaDon();
        orderHistory.setHoaDon(findOrderCurrent);
        orderHistory.setCreatedAt(new Date());
        orderHistory.setCreatedBy(req.getUser());
        orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
        orderHistory.setMoTa("Đã thêm sản phẩm [" + req.getProductName() + "] với số lượng [" + req.getAmount() + "].");
        orderHistory.setLoaiThaoTac(9);
        lichSuHoaDonRepository.save(orderHistory);
      }
      return orderItemConverter.convertEntityToResponse(createdOrderItem);
    }
  }

  @Override
  public OrderItemResponse updateAmountItemInCartOrder(OrderItemRequest req) throws Exception {
    HoaDon findOrderCurrent = orderRepository.findOneById(req.getOrder().getId());
    Optional<HoaDonChiTiet> findCartItemOrder = orderItemRepository.findById(req.getId());
    Optional<SanPhamChiTiet> getProductItemInCartItemOrder = sanPhamChiTietRepository.findProductById(findCartItemOrder.get().getSanPhamChiTiet().getId());

    if (findOrderCurrent == null) {
      throw new RestApiException("Không tìm thấy đơn hàng hiện tại!");
    }
    if (findCartItemOrder == null) {
      throw new RestApiException("Không tìm thấy sản phẩm này trong đơn hàng!");
    }
    if (!getProductItemInCartItemOrder.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    SanPhamChiTiet getOptional = getProductItemInCartItemOrder.get();
    List<ImeiCustomRequest> imeiFromRequest = req.getImeis();
    Set<ImeiDaBan> imeiCurrentInCartOrder = findCartItemOrder.get().getImeisDaBan();
    Set<String> currentImeis = imeiCurrentInCartOrder.stream()
            .map(ImeiDaBan::getSoImei)
            .collect(Collectors.toSet());

    List<ImeiDaBan> imeiToAdd = imeiFromRequest.stream()
            .filter(imei -> !currentImeis.contains(imei.getSoImei()))
            .map(imei -> {
              ImeiDaBan newImei = new ImeiDaBan();
              newImei.setSoImei(imei.getSoImei());
              newImei.setTrangThai(StatusImei.PENDING_DELIVERY);
              newImei.setHoaDonChiTiet(findCartItemOrder.get());
              return newImei;
            })
            .collect(Collectors.toList());

    int totalImei = 0;
    for (HoaDonChiTiet orderItem : findOrderCurrent.getOrderItems()) {
      if (orderItem.getImeisDaBan() != null) {
        totalImei += orderItem.getImeisDaBan().size();
      }
    }

    if (totalImei + req.getImeis().size() - imeiCurrentInCartOrder.size() > 4) {
      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
    }

    List<ImeiDaBan> imeiToRemove = imeiCurrentInCartOrder.stream()
            .filter(imei -> !imeiFromRequest.stream()
                    .anyMatch(item -> item.getSoImei().equals(imei.getSoImei())))
            .collect(Collectors.toList());

    if (findCartItemOrder.get().getImeisDaBan().size() > 0) {
      Set<Imei> imeisProduct = getOptional.getImeis();
      for (ImeiDaBan imeiDaBan : imeiToAdd) {
        if (findOrderCurrent.getTongTien() != null) {
          BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
          findOrderCurrent.setTongTien(tongTienCurrent.add(getOptional.getDonGia()));
          if (findOrderCurrent.getKhachCanTra() != null) {
            BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
            findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(getOptional.getDonGia()));
          }
          if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
            BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
            findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(getOptional.getDonGia()));
          }
          orderRepository.save(findOrderCurrent);
        }
        imeisProduct.forEach((s) -> {
          if (imeiDaBan.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.PENDING_DELIVERY);
          }
        });
      }
      for (ImeiDaBan imeiDaBan : imeiToRemove) {
        if (findOrderCurrent.getTongTien() != null) {
          BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
          findOrderCurrent.setTongTien(tongTienCurrent.subtract(getOptional.getDonGia()));
          if (findOrderCurrent.getKhachCanTra() != null) {
            BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
            findOrderCurrent.setKhachCanTra(khachCanTraCurrent.subtract(getOptional.getDonGia()));
          }
          if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
            BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
            findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.subtract(getOptional.getDonGia()));
          }
          orderRepository.save(findOrderCurrent);
        }
        imeisProduct.forEach((s) -> {
          if (imeiDaBan.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.NOT_SOLD);
          }
        });
      }
    } else if (findCartItemOrder.get().getImeisDaBan().size() == 0) {
      BigDecimal donGiaProduct = BigDecimal.ZERO;
//      if (findCartItemOrder.get().getDonGiaSauGiam() != null && findCartItemOrder.get().getDonGiaSauGiam().compareTo(BigDecimal.ZERO) != 0) {
//        donGiaProduct.add(findCartItemOrder.get().getDonGiaSauGiam());
//      } else {
      donGiaProduct.add(findCartItemOrder.get().getDonGia());
//      }
      Set<Imei> imeisProduct = getOptional.getImeis();
      for (ImeiDaBan imeiDaBan : imeiToAdd) {
        imeisProduct.forEach((s) -> {
          if (imeiDaBan.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.PENDING_DELIVERY);
          }
        });
      }
      if (findOrderCurrent.getTongTien() != null) {
        BigDecimal tongTienCurrent = findOrderCurrent.getTongTien().subtract(findCartItemOrder.get().getDonGia());
        findOrderCurrent.setTongTien(tongTienCurrent.add(getOptional.getDonGia().multiply(BigDecimal.valueOf(imeiToAdd.size()))));
        if (findOrderCurrent.getKhachCanTra() != null) {
          BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra().subtract(findCartItemOrder.get().getDonGia());
          findOrderCurrent.setKhachCanTra(khachCanTraCurrent.add(getOptional.getDonGia().multiply(BigDecimal.valueOf(imeiToAdd.size()))));
        }
        if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
          BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam().subtract(findCartItemOrder.get().getDonGia());
          findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.add(getOptional.getDonGia().multiply(BigDecimal.valueOf(imeiToAdd.size()))));
        }
      }

    }

    orderRepository.save(findOrderCurrent);

    if (findCartItemOrder.get().getSoLuong() != req.getAmount()) {
      LichSuHoaDon orderHistory = new LichSuHoaDon();
      orderHistory.setHoaDon(findOrderCurrent);
      orderHistory.setCreatedAt(new Date());
      orderHistory.setCreatedBy(req.getUser());
      orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
      if (findOrderCurrent.getLoaiHoaDon().equals(OrderType.CLIENT)) {
        if (findCartItemOrder.get().getImeisDaBan().size() == 0) {
          orderHistory.setMoTa("Đã cập nhật imei tương ứng với số lượng mua của sản phẩm [" + req.getProductName() + "].");
        } else {
          orderHistory.setMoTa("Đã cập nhật số lượng mua của sản phẩm [" + req.getProductName() + "] từ [" + findCartItemOrder.get().getSoLuong() + "] thành [" + req.getAmount() + "].");
        }
      }
      orderHistory.setMoTa("Đã cập nhật số lượng mua của sản phẩm [" + req.getProductName() + "] từ [" + findCartItemOrder.get().getSoLuong() + "] thành [" + req.getAmount() + "].");
      orderHistory.setLoaiThaoTac(9);
      lichSuHoaDonRepository.save(orderHistory);
    }
    if (findOrderCurrent.getLoaiHoaDon().equals(OrderType.DELIVERY)) {

    }
    getOptional.setSoLuongTonKho(getOptional.getSoLuongTonKho() + findCartItemOrder.get().getSoLuong() - req.getAmount());
    findCartItemOrder.get().setSoLuong(req.getAmount());
    HoaDonChiTiet updatedCartItemOrder = orderItemRepository.save(findCartItemOrder.get());

    imeiDaBanCustomRepository.deleteAll(imeiToRemove);
    imeiDaBanCustomRepository.saveAll(imeiToAdd);

    sanPhamChiTietRepository.save(getOptional);
    return null;

  }

  @Override
  public boolean removeCartItemOrderById(String id, OrderItemRequest req) throws Exception {
    Optional<HoaDonChiTiet> findCartItemOrder = orderItemRepository.findById(id);
    HoaDon findOrderCurrent = orderRepository.findOneById(findCartItemOrder.get().getHoaDon().getId());
    Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
            findProductById(findCartItemOrder.get().getSanPhamChiTiet().getId());

    if (!findCartItemOrder.isPresent()) {
      throw new RestApiException("Không tìm thấy sản phẩm này trong đơn hàng!");
    }
    if (!findProductItem.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }
    if (findOrderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }

    try {
      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      for (ImeiDaBan imei : findCartItemOrder.get().getImeisDaBan()) {
        imeisProduct.forEach((s) -> {
          if (imei.getSoImei().equals(s.getSoImei())) {
            s.setTrangThai(StatusImei.NOT_SOLD);
          }
        });
      }
      if (findCartItemOrder.get().getImeisDaBan().size() > 0) {
        if (findOrderCurrent.getTongTien() != null) {
          BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
          BigDecimal amount = new BigDecimal(findCartItemOrder.get().getImeisDaBan().size());
          findOrderCurrent.setTongTien(tongTienCurrent.subtract(findProductItem.get().getDonGia().multiply(amount)));

          if (findOrderCurrent.getKhachCanTra() != null) {
            BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
            findOrderCurrent.setKhachCanTra(khachCanTraCurrent.subtract(findProductItem.get().getDonGia().multiply(amount)));
          }

          if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
            BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
            findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.subtract(findProductItem.get().getDonGia().multiply(amount)));
          }
        }
      } else {
        if (findOrderCurrent.getTongTien() != null) {
          BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
          findOrderCurrent.setTongTien(tongTienCurrent.subtract(findCartItemOrder.get().getDonGia()));

          if (findOrderCurrent.getKhachCanTra() != null) {
            BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
            findOrderCurrent.setKhachCanTra(khachCanTraCurrent.subtract(findCartItemOrder.get().getDonGia()));
          }

          if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
            BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam();
            findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.subtract(findCartItemOrder.get().getDonGia()));
          }
        }
      }

      LichSuHoaDon orderHistory = new LichSuHoaDon();
      orderHistory.setHoaDon(findOrderCurrent);
      orderHistory.setCreatedAt(new Date());
      orderHistory.setCreatedBy(req.getUser());
      orderHistory.setThaoTac("Cập Nhật Đơn Hàng");
      orderHistory.setMoTa("Đã xóa [" + req.getAmount() + "] sản phẩm " + req.getProductName() + " khỏi đơn hàng.");
      orderHistory.setLoaiThaoTac(9);
      lichSuHoaDonRepository.save(orderHistory);

      orderRepository.save(findOrderCurrent);

      Integer resetAmount = findCartItemOrder.get().getSoLuong();
      imeiDaBanCustomRepository.deleteAll(findCartItemOrder.get().getImeisDaBan());
      orderItemRepository.deleteById(findCartItemOrder.get().getId());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
              resetAmount);
      sanPhamChiTietRepository.save(findProductItem.get());
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @Override
  public OrderItemResponse refundOrder(OrderItemsCustomRefundRequest req) throws Exception {
    HoaDon findOrderCurrent = orderRepository.findOneById(req.getId());
    if (findOrderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }
    for (OrderItemRefundRequest order : req.getOrderItemRefunds()) {
      Optional<HoaDonChiTiet> findCartItemOrder = orderItemRepository.findById(order.getId());

      Optional<SanPhamChiTiet> findProductItem = sanPhamChiTietRepository.
              findProductById(findCartItemOrder.get().getSanPhamChiTiet().getId());

      if (!findCartItemOrder.isPresent()) {
        throw new RestApiException("Sản phẩm không tồn tại trong đơn hàng!");
      }
      if (!findProductItem.isPresent()) {
        throw new RestApiException("Sản phẩm không tồn tại!");
      }
      Set<Imei> imeisProduct = findProductItem.get().getImeis();
      imeisProduct.forEach((s) -> {
        if (order.getImei().getSoImei().equals(s.getSoImei())) {
          s.setTrangThai(StatusImei.REFUND);
        }
      });
      findCartItemOrder.get().getImeisDaBan().forEach((s) -> {
        if (order.getImei().getSoImei().equals(s.getSoImei())) {
          s.setTrangThai(StatusImei.REFUND);
        }
      });

//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
//              order.getSoLuong());
//      sanPhamChiTietRepository.save(findProductItem.get());

    }
    if (findOrderCurrent.getTienTraHang() != null) {
      findOrderCurrent.setTienTraHang(findOrderCurrent.getTienTraHang().add(req.getTongTienTraHang()));

    } else {
      findOrderCurrent.setTienTraHang((req.getTongTienTraHang()));
    }
    if (findOrderCurrent.getTienTraKhach() != null) {
      findOrderCurrent.setTienTraKhach(findOrderCurrent.getTienTraKhach().add(req.getTongTien()));

    } else {
      findOrderCurrent.setTienTraKhach((req.getTongTien()));
    }

    if (req.getVoucher().getId() != null) {
      Optional<Voucher> findVoucher = voucherRepository.findById(req.getVoucher().getId());
      if (findVoucher.isPresent()) {
        findOrderCurrent.setVoucher(findVoucher.get());
        BigDecimal tongTien = findOrderCurrent.getTongTien();
        BigDecimal tongTienSauKhiGiam = tongTien.subtract(findOrderCurrent.getTongTienSauKhiGiam());
        BigDecimal giaTriVoucherNew = findVoucher.get().getGiaTriVoucher();
        findOrderCurrent.setTongTienSauKhiGiam(findOrderCurrent.getTongTienSauKhiGiam().add(tongTienSauKhiGiam).subtract(giaTriVoucherNew));
      }
    } else {
      if (findOrderCurrent.getVoucher() != null) {
        Optional<Voucher> findVoucher = voucherRepository.findById(findOrderCurrent.getVoucher().getId());
        if (req.getTongTienSauKhiTra().compareTo(findVoucher.get().getDieuKienApDung()) < 0) {
          BigDecimal tongTien = findOrderCurrent.getTongTien();
          BigDecimal tongTienSauKhiGiam = tongTien.subtract(findOrderCurrent.getTongTienSauKhiGiam());
          findOrderCurrent.setTongTienSauKhiGiam(findOrderCurrent.getTongTienSauKhiGiam().add(tongTienSauKhiGiam));
          findOrderCurrent.setVoucher(null);
        }
      }
    }

    boolean flagFullRefund = true;
    for (HoaDonChiTiet orderItem : findOrderCurrent.getOrderItems()) {
      for (ImeiDaBan s : orderItem.getImeisDaBan()) {
        if (!s.getTrangThai().equals(StatusImei.REFUND)) {
          flagFullRefund = false;
        }
      }
    }

    if (flagFullRefund) {
      findOrderCurrent.setTrangThai(OrderStatus.REFUND_FULL);
    } else {
      findOrderCurrent.setTrangThai(OrderStatus.REFUND_A_PART);
    }

    findOrderCurrent.setKhachCanTra(findOrderCurrent.getKhachCanTra().subtract(req.getTongTien()));
//    findOrderCurrent.setTienKhachTra(findOrderCurrent.getTienKhachTra().subtract(req.getTongTien()));
    orderRepository.save(findOrderCurrent);

    HinhThucThanhToan hinhThucThanhToan = new HinhThucThanhToan();
    boolean checkCodeExists = false;
    String code;

    do {
      code = RandomCodeGenerator.generateRandomNumber();
      Optional<HinhThucThanhToan> payment = hinhThucThanhToanCustomRepository.getPaymentMethodById(code);

      if (!payment.isPresent()) {
        checkCodeExists = false;
      } else {
        checkCodeExists = true;
      }
    } while (checkCodeExists);

    hinhThucThanhToan.setMa(code);
    hinhThucThanhToan.setHoaDon(findOrderCurrent);
    hinhThucThanhToan.setSoTienThanhToan(req.getTongTien());
    hinhThucThanhToan.setLoaiThanhToan(1);
    hinhThucThanhToan.setHinhThucThanhToan(1);
    hinhThucThanhToan.setTrangThai(1);
    hinhThucThanhToan.setCreatedAt(new Date());
    hinhThucThanhToan.setCreatedBy(req.getCreatedByRefund());
    hinhThucThanhToanRepository.save(hinhThucThanhToan);

    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(findOrderCurrent);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setCreatedBy(req.getCreatedByRefund());
    orderHistory.setThaoTac("Hoàn Trả");
    orderHistory.setMoTa("Đã hoàn trả [" + req.getAmount() + "] sản phẩm với tổng số tiền đã trả lại cho khách là [" + req.getTongTienString() + "]. " + req.getGhiChu());
    orderHistory.setLoaiThaoTac(7);
    lichSuHoaDonRepository.save(orderHistory);
    return null;
  }
}
