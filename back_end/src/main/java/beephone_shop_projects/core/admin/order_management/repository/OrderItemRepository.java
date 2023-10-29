package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<HoaDonChiTiet, String> {
}
