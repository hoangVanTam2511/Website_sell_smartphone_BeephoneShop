package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDanhMucRepository extends JpaRepository<DanhMuc,String> {
}
