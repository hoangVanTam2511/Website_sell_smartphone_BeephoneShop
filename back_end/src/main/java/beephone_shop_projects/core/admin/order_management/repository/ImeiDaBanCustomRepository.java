package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.entity.ImeiDaBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImeiDaBanCustomRepository extends JpaRepository<ImeiDaBan, String> {

}
