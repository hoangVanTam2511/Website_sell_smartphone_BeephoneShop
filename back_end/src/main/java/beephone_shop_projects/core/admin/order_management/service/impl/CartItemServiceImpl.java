package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartItemConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.CartItemService;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImpl extends AbstractServiceImpl<GioHangChiTiet, CartItemResponse, CartItemRequest, String> implements CartItemService {

  @Autowired
  private CartItemRepositoryImpl cartItemRepository;

  @Autowired
  private CartItemConverter cartItemConverter;

  public CartItemServiceImpl(CartItemRepository repo, CartItemConverter converter) {
    super(repo, converter);
  }

  @Override
  public CartItemResponse getCartItemById(String id) {
    GioHangChiTiet findCartItem = cartItemRepository.getCartItemById(id);
    if (findCartItem == null) {
      throw new RestApiException(Message.ORDER_NOT_EXIST);
    }
    return cartItemConverter.convertEntityToResponse(cartItemRepository.getCartItemById(id));
  }

}
