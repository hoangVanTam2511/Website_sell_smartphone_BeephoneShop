package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.GioHang;

public interface GioHangRepository extends GenericRepository<GioHang, String> {
  GioHang getCartByOrderId(String id);
}
