package beephone_shop_projects.core.admin.product_management.repository;


import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.repository.ICameraRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CameraRepository extends ICameraRepository {

    Page<Camera> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  nha_san_xuat SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Camera> findAllByDelected(Boolean delected);


    @Query(value = """
     SELECT SUBSTRING(ma,8)+1 from camera  ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    Camera findByDoPhanGiai(String doPhanGiai);

}
