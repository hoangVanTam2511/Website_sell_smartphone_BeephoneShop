package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Camera;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICameraRepository extends JpaRepository<Camera,String> {
}
