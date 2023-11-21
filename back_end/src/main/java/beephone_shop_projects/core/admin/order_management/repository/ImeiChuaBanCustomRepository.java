package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import beephone_shop_projects.repository.IImeiRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImeiChuaBanCustomRepository extends JpaRepository<ImeiChuaBan, String> {

}
