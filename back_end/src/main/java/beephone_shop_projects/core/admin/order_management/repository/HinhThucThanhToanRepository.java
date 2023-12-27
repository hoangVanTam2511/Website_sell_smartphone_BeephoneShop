package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.HinhThucThanhToan;

import java.util.List;

public interface HinhThucThanhToanRepository extends GenericRepository<HinhThucThanhToan, String> {
  List<HinhThucThanhToan> getPaymentMethodsByOrderId(String id);
  HinhThucThanhToan getPaymentMethodById(String id);
}
