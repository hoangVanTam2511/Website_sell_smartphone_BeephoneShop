package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.ImeiDaBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderJpaCustomRepository extends JpaRepository<HoaDon, String> {

}
