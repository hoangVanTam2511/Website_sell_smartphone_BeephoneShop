package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderItemsCustomRefundRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderItemResponse;

public interface CartItemService extends GenericService<CartItemResponse, CartItemRequest, String> {

  CartItemResponse addProductItemToCart(CartItemRequest req) throws Exception;

  CartItemResponse addProductItemToCartByScanner(CartItemRequest req) throws Exception;

  boolean removeCartItemById(String id) throws Exception;

  CartItemResponse updateAmountItemInCart(CartItemRequest req) throws Exception;

  OrderItemResponse updateAmountItemInCartOrder(OrderItemRequest req) throws Exception;

  OrderItemResponse addProductItemToCartOrder(OrderItemRequest req) throws Exception;

  OrderItemResponse addProductItemToCartOrderByScanner(OrderItemRequest req) throws Exception;

  boolean removeCartItemOrderById(String id) throws Exception;

  OrderItemResponse refundOrder(OrderItemsCustomRefundRequest req) throws Exception;

}
