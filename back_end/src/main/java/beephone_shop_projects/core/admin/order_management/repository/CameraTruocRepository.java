package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.entity.CameraTruoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CameraTruocRepository extends JpaRepository<CameraTruoc, String> {
}
