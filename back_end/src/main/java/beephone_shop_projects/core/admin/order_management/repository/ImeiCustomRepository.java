package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.repository.IImeiRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImeiCustomRepository extends IImeiRepository {

  @Query("select i from Imei i where i.soImei = ?1")
  Optional<Imei> findImeiBySoImei(String imei);

}
