package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.GioHangChiTiet;

import java.util.List;

public interface CartItemRepository extends GenericRepository<GioHangChiTiet, String> {

  GioHangChiTiet getCartItemById(String id);

}
