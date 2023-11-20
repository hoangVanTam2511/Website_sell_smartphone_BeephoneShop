package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonCustomRepository extends JpaRepository<LichSuHoaDon, String> {

}
