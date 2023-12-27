package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.CameraSauDienThoai;
import beephone_shop_projects.entity.DanhMucDienThoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CameraSauDienThoaiRepository extends JpaRepository<CameraSauDienThoai, String> {
}
