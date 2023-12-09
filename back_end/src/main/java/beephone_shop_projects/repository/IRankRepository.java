package beephone_shop_projects.repository;

import beephone_shop_projects.entity.XepHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRankRepository extends JpaRepository<XepHang, String> {
}
