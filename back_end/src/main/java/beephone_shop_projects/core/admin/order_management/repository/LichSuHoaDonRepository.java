package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.LichSuHoaDon;

import java.util.List;

public interface LichSuHoaDonRepository extends GenericRepository<LichSuHoaDon, String> {

  List<LichSuHoaDon> getOrderHistoriesByOrderId(String id);

}
