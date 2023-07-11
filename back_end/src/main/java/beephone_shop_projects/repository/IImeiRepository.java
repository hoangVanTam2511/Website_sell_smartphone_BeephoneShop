package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Imei;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImeiRepository extends JpaRepository<Imei,String> {
}
