package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.dto.CartDto;

public interface GioHangService extends GenericService<CartDto, String> {
  public CartDto getCartByOrderId(String id);
}
