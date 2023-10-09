package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.service.GenericService;

public interface CartItemService extends GenericService<CartItemResponse, CartItemRequest, String> {

  public CartItemResponse getCartItemById(String id);

}
