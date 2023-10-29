package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartItemConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.CartItemService;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    GioHangChiTiet cartItem = new GioHangChiTiet();
    if (findCartCurrent == null) {
      throw new RestApiException("Không tìm thấy giỏ hàng hiện tại!");
    }
    if (!findProductItem.isPresent()) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    if (findProductItemCurrentInCart.isPresent()) {
      GioHangChiTiet getProductItemInCartCurrent = findProductItemCurrentInCart.get();
      getProductItemInCartCurrent.setSoLuong(getProductItemInCartCurrent
              .getSoLuong() + req.getAmount());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
      GioHangChiTiet updatedCartItem = cartItemRepository.save(getProductItemInCartCurrent);
      return cartItemConverter.convertEntityToResponse(updatedCartItem);
    } else {
      cartItem.setSoLuong(req.getAmount());
      cartItem.setSanPhamChiTiet(findProductItem.get());
      cartItem.setGioHang(findCartCurrent);
      cartItem.setDonGia(findProductItem.get().getDonGia());
      findProductItem.get().setSoLuongTonKho(findProductItem.get().getSoLuongTonKho() - req.getAmount());
      sanPhamChiTietRepository.save(findProductItem.get());
      GioHangChiTiet createdCartItem = cartItemRepository.save(cartItem);
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
      Integer resetAmount = findCartItem.getSoLuong();
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
    GioHangChiTiet findCartItem = cartItemRepository.findOneById(req.getId());
    Optional<SanPhamChiTiet> getProductItemInCartItem = sanPhamChiTietRepository.findProductById(findCartItem.getSanPhamChiTiet().getId());

    if (findCartItem == null) {
      throw new RestApiException("Không tìm thấy sản phẩm này trong giỏ hàng!");
    }
    if (getProductItemInCartItem == null) {
      throw new RestApiException("Sản phẩm không tồn tại!");
    }

    SanPhamChiTiet getOptional = getProductItemInCartItem.get();
    getOptional.setSoLuongTonKho(getOptional.getSoLuongTonKho() + findCartItem.getSoLuong() - req.getAmount());
    findCartItem.setSoLuong(req.getAmount());
    sanPhamChiTietRepository.save(getOptional);
    GioHangChiTiet updatedCartItem = cartItemRepository.save(findCartItem);
    return cartItemConverter.convertEntityToResponse(updatedCartItem);
  }
}
