package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.service.GenericService;

import java.util.List;

public interface CartItemService extends GenericService<CartItemResponse, CartItemRequest, String> {

  CartItemResponse addProductItemToCart(CartItemRequest req) throws Exception;

  boolean removeCartItemById(String id) throws Exception;

  CartItemResponse updateAmountItemInCart(CartItemRequest req) throws Exception;

}
