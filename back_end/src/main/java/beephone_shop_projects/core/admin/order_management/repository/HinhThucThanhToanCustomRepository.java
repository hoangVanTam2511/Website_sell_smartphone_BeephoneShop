package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HinhThucThanhToanCustomRepository extends JpaRepository<HinhThucThanhToan, String> {

  @Query("SELECT P FROM HinhThucThanhToan P WHERE P.ma = ?1")
  Optional<HinhThucThanhToan> getPaymentMethodById(String id);

  @Query("SELECT P FROM HinhThucThanhToan P WHERE P.hoaDon.id = ?1")
  List<HinhThucThanhToan> getPaymentMethodsById(String id);
}
