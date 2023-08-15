package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.repository.ICameraRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CameraRepository extends ICameraRepository {

    Page<Camera> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
             UPDATE  camera SET delected = :delected 
             where id = :id
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);

    List<Camera> findAllByDelected(Boolean delected);

    Camera findByDoPhanGiai(Integer doPhanGiai);
}
