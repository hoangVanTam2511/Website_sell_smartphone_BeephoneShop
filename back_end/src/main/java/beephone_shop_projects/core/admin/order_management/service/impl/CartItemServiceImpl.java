package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartItemConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ImeiCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiChuaBanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ImeiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.CartItemService;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl extends AbstractServiceImpl<GioHangChiTiet, CartItemResponse, CartItemRequest, String> implements CartItemService {

  @Autowired
  private CartItemRepositoryImpl cartItemRepository;

  @Autowired
  private ProductDetailRepository sanPhamChiTietRepository;

  @Autowired
  private CartRepositoryImpl cartRepository;

  @Autowired
  private CartItemConverter cartItemConverter;

  @Autowired
  private ImeiRepositoryImpl imeiRepository;

  @Autowired
  private ImeiChuaBanCustomRepository imeiChuaBanCustomRepository;

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
      List<ImeiChuaBan> imeisInCart = findProductItemCurrentInCart.get().getImeisChuaBan();
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
      cartItem.setDonGia(findProductItem.get().getDonGia());
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

    int totalAmount = 0;
    for (GioHangChiTiet cartItem : findCartCurrent.getCartItems()) {
      totalAmount += cartItem.getSoLuong();
    }

    SanPhamChiTiet getOptional = getProductItemInCartItem.get();
    List<ImeiCustomRequest> imeiFromRequest = req.getImeis();
    List<ImeiChuaBan> imeiCurrentInCart = findCartItem.getImeisChuaBan();
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

    if (totalAmount + imeiToAdd.size() > 4) {
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
}
