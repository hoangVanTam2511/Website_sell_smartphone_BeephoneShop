package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Pin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPinRepository extends JpaRepository<Pin,String> {
}
