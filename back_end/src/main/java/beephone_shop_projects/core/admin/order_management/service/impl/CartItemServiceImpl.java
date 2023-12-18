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
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.HoaDonChiTiet;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.ImeiDaBan;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
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
//        findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//        sanPhamChiTietRepository.save(findProductItem.get());
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
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
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

    if (findProductItemCurrentInCart.isPresent()) {
//      List<ImeiChuaBan> imeisInCart = findProductItemCurrentInCart.get().getImeisChuaBan();
//      for (ImeiChuaBan imeiChuaBan : imeisInCart){
//        if (imeiChuaBan.getSoImei().equals(req.getImei())){
//        }
//      }
      GioHangChiTiet getProductItemInCartCurrent = findProductItemCurrentInCart.get();
      getProductItemInCartCurrent.setSoLuong(getProductItemInCartCurrent
              .getSoLuong() + req.getAmount());
//        findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//        sanPhamChiTietRepository.save(findProductItem.get());
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
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
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
//      Integer resetAmount = findCartItem.getSoLuong();
      imeiChuaBanCustomRepository.deleteAll(findCartItem.getImeisChuaBan());
      cartItemRepository.deleteById(findCartItem.getId());
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
//              resetAmount);
//      sanPhamChiTietRepository.save(findProductItem.get());
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
//    getOptional.setSoLuongTonKho(getOptional.getSoLuongTonKho() + findCartItem.getSoLuong() - req.getAmount());
    findCartItem.setSoLuong(req.getAmount());
    GioHangChiTiet updatedCartItem = cartItemRepository.save(findCartItem);


//    imeiCurrentInCart.addAll(imeiToAdd);
//    imeiCurrentInCart.removeAll(imeiToRemove);
    imeiChuaBanCustomRepository.deleteAll(imeiToRemove);
    imeiChuaBanCustomRepository.saveAll(imeiToAdd);

//    sanPhamChiTietRepository.save(getOptional);
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
      getProductItemInCartOrderCurrent.setSoLuong(getProductItemInCartOrderCurrent
              .getSoLuong() + req.getAmount());
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
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

//      BigDecimal tongTien;
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      } else {
//        tongTien = BigDecimal.ZERO;
//      }
//
//      List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//      Voucher maxVoucher = vouchers.stream()
//              .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//              .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//              .orElse(null);
//      if (maxVoucher != null) {
//        findOrderCurrent.setVoucher(maxVoucher);
//        orderRepository.save(findOrderCurrent);
//      } else {
//        findOrderCurrent.setVoucher(null);
//        orderRepository.save(findOrderCurrent);
//      }
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
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
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

//      BigDecimal tongTien;
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      } else {
//        tongTien = BigDecimal.ZERO;
//      }
//
//      List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//      Voucher maxVoucher = vouchers.stream()
//              .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//              .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//              .orElse(null);
//      if (maxVoucher != null) {
//        findOrderCurrent.setVoucher(maxVoucher);
//        orderRepository.save(findOrderCurrent);
//      } else {
//        findOrderCurrent.setVoucher(null);
//        orderRepository.save(findOrderCurrent);
//      }
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
      getProductItemInCartOrderCurrent.setSoLuong(getProductItemInCartOrderCurrent
              .getSoLuong() + req.getAmount());
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
      HoaDonChiTiet updatedCartItemOrder = orderItemRepository.save(getProductItemInCartOrderCurrent);
      findImei.get().setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiRepository.save(findImei.get());

      ImeiDaBan imeiDaBan = new ImeiDaBan();
      imeiDaBan.setSoImei(req.getImei());
      imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiDaBan.setHoaDonChiTiet(updatedCartItemOrder);
      imeiDaBanCustomRepository.save(imeiDaBan);

//      BigDecimal tongTien;
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      } else {
//        tongTien = BigDecimal.ZERO;
//      }
//
//      List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//      Voucher maxVoucher = vouchers.stream()
//              .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//              .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//              .orElse(null);
//      if (maxVoucher != null) {
//        findOrderCurrent.setVoucher(maxVoucher);
//        orderRepository.save(findOrderCurrent);
//      } else {
//        findOrderCurrent.setVoucher(null);
//        orderRepository.save(findOrderCurrent);
//      }

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
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//      sanPhamChiTietRepository.save(findProductItem.get());
      HoaDonChiTiet createdOrderItem = orderItemRepository.save(orderItem);
      findImei.get().setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiRepository.save(findImei.get());

      ImeiDaBan imeiDaBan = new ImeiDaBan();
      imeiDaBan.setSoImei(req.getImei());
      imeiDaBan.setTrangThai(StatusImei.PENDING_DELIVERY);
      imeiDaBan.setHoaDonChiTiet(createdOrderItem);
      imeiDaBanCustomRepository.save(imeiDaBan);

//      BigDecimal tongTien;
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      } else {
//        tongTien = BigDecimal.ZERO;
//      }
//
//      List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//      Voucher maxVoucher = vouchers.stream()
//              .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//              .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//              .orElse(null);
//      if (maxVoucher != null) {
//        findOrderCurrent.setVoucher(maxVoucher);
//        orderRepository.save(findOrderCurrent);
//      } else {
//        findOrderCurrent.setVoucher(null);
//        orderRepository.save(findOrderCurrent);
//      }


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

//    int totalImei = 0;
//    for (HoaDonChiTiet orderItem : findOrderCurrent.getOrderItems()) {
//      if (orderItem.getImeisDaBan() != null) {
//        totalImei += orderItem.getImeisDaBan().size();
//      }
//    }

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

//    if (totalImei >= 4) {
//      throw new RestApiException("Lựa chọn tối đa 4 số lượng sản phẩm!");
//    }
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

//    BigDecimal tongTien;
//    if (findOrderCurrent.getTongTien() != null) {
//      tongTien = findOrderCurrent.getTongTien();
//    } else {
//      tongTien = BigDecimal.ZERO;
//    }
//
//    List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//    Voucher maxVoucher = vouchers.stream()
//            .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//            .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//            .orElse(null);
//    if (maxVoucher != null) {
//      findOrderCurrent.setVoucher(maxVoucher);
//      orderRepository.save(findOrderCurrent);
//    } else {
//      findOrderCurrent.setVoucher(null);
//      orderRepository.save(findOrderCurrent);
//    }

    findCartItemOrder.get().setSoLuong(req.getAmount());
    HoaDonChiTiet updatedCartItemOrder = orderItemRepository.save(findCartItemOrder.get());
//    getOptional.setSoLuongTonKho(getOptional.getSoLuongTonKho() + findCartItem.getSoLuong() - req.getAmount());


//    imeiCurrentInCart.addAll(imeiToAdd);
//    imeiCurrentInCart.removeAll(imeiToRemove);
    imeiDaBanCustomRepository.deleteAll(imeiToRemove);
    imeiDaBanCustomRepository.saveAll(imeiToAdd);

//    sanPhamChiTietRepository.save(getOptional);
    return null;

  }

  @Override
  public boolean removeCartItemOrderById(String id) throws Exception {
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
        orderRepository.save(findOrderCurrent);
      }
//      BigDecimal tongTien;
//
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      } else {
//        tongTien = BigDecimal.ZERO;
//      }
//
//      List<Voucher> vouchers = voucherRepository.getAllVoucherList();
//      Voucher maxVoucher = vouchers.stream()
//              .filter(item -> item.getGiaTriVoucher() != null && tongTien.compareTo(item.getDieuKienApDung()) >= 0)
//              .max(Comparator.comparing(Voucher::getGiaTriVoucher))
//              .orElse(null);
//        if (maxVoucher != null) {
//          findOrderCurrent.setVoucher(maxVoucher);
////          findOrderCurrent.setKhachCanTra(findOrderCurrent.getKhachCanTra().subtract(maxVoucher.getGiaTriVoucher()));
//          orderRepository.save(findOrderCurrent);
//        } else {
//          findOrderCurrent.setVoucher(null);
////          findOrderCurrent.setKhachCanTra(findOrderCurrent.getKhachCanTra().add(maxVoucher.getGiaTriVoucher()));
//          orderRepository.save(findOrderCurrent);
//        }

//      Integer resetAmount = findCartItem.getSoLuong();
      imeiDaBanCustomRepository.deleteAll(findCartItemOrder.get().getImeisDaBan());
      orderItemRepository.deleteById(findCartItemOrder.get().getId());
//      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
//              resetAmount);
//      sanPhamChiTietRepository.save(findProductItem.get());
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
          s.setTrangThai(StatusImei.NOT_SOLD);
        }
      });
      findCartItemOrder.get().getImeisDaBan().forEach((s) -> {
        if (order.getImei().getSoImei().equals(s.getSoImei())) {
          s.setTrangThai(StatusImei.REFUND);
        }
      });

      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() +
              order.getSoLuong());
      sanPhamChiTietRepository.save(findProductItem.get());

//      if (findOrderCurrent.getKhachCanTra() != null) {
//        BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra();
//        BigDecimal khachCanTra = khachCanTraCurrent.subtract(req.getTongTien().add(req.getPhuPhi()));
//        findOrderCurrent.setKhachCanTra(khachCanTra);
//
////      findOrderCurrent.setTienTraKhach();
//        orderRepository.save(findOrderCurrent);
//      }

//    if (findOrderCurrent.getTongTien() != null) {
//      BigDecimal tongTienCurrent = findOrderCurrent.getTongTien();
//      findOrderCurrent.setTongTien(tongTienCurrent.subtract(req.getTongTien()));
//
//      if (findOrderCurrent.getKhachCanTra() != null) {
//        BigDecimal khachCanTraCurrent = findOrderCurrent.getKhachCanTra().add(req.getPhuPhi());
//        findOrderCurrent.setKhachCanTra(khachCanTraCurrent.subtract(req.getTongTien()));
//      }
//
////      if (findOrderCurrent.getTongTienSauKhiGiam() != null) {
////        BigDecimal tongTienSauKhiGiamCurrent = findOrderCurrent.getTongTienSauKhiGiam().add(req.getPhuPhi());
////        findOrderCurrent.setTongTienSauKhiGiam(tongTienSauKhiGiamCurrent.subtract(req.getTongTien()));
////      }
//    }


//    findCartItemOrder.get().setSoLuong(findProductItem.get().getSoLuongTonKho() - req.getAmount());
//    orderItemRepository.save(findCartItemOrder.get());
    }
    if (findOrderCurrent.getTienTraHang() != null) {
      findOrderCurrent.setTienTraHang(findOrderCurrent.getTienTraHang().add(req.getTongTien()));

    } else {
      findOrderCurrent.setTienTraHang((req.getTongTien()));
    }
    if (findOrderCurrent.getTienTraKhach() != null) {
      findOrderCurrent.setTienTraKhach(findOrderCurrent.getTienTraKhach().add(req.getTongTien()));

    } else {
      findOrderCurrent.setTienTraKhach((req.getTongTien()));
    }

//    if (findOrderCurrent.getVoucher() != null) {
//      BigDecimal dieuKien = findOrderCurrent.getVoucher().getDieuKienApDung();
//      BigDecimal tongTien = BigDecimal.ZERO;
//      BigDecimal tongTienTraHang = BigDecimal.ZERO;
//
//      if (findOrderCurrent.getTongTien() != null) {
//        tongTien = findOrderCurrent.getTongTien();
//      }
//      if (findOrderCurrent.getTienTraHang() != null) {
//        tongTienTraHang = findOrderCurrent.getTienTraHang();
//      }
//
//      BigDecimal tongTienSauKhiTra = tongTien.subtract(tongTienTraHang);
//
//      if (tongTienSauKhiTra.compareTo(dieuKien) < 0) {
//        findOrderCurrent.setVoucher(null);
//      }
//    }

    orderRepository.save(findOrderCurrent);
//    SanPhamChiTiet getOptional = findProductItem.get();

    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(findOrderCurrent);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setCreatedBy(req.getCreatedByRefund());
    orderHistory.setThaoTac("Hoàn Trả");
    orderHistory.setMoTa("Đã hoàn trả [" + req.getAmount() + "] sản phẩm với số tiền là [" + req.getTongTien() + "]. " + req.getGhiChu());
    orderHistory.setLoaiThaoTac(7);
    lichSuHoaDonRepository.save(orderHistory);
    return null;
  }
}
