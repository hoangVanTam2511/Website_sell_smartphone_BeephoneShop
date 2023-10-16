package beephone_shop_projects.core.admin.product_management.repository;


import beephone_shop_projects.core.admin.product_management.model.responce.CameraResponce;
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
           UPDATE  camera SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Camera> findAllByDelected(Boolean delected);

    @Query(value = """
     SELECT SUBSTRING(ma,8)+1 from camera  ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    Camera findByDoPhanGiai(String doPhanGiai);

    @Query(value = """
        SELECT ROW_NUMBER() OVER() AS stt, cam.id, cam.ma, cam.do_phan_giai from camera as cam
        WHERE  (cam.do_phan_giai like :text or cam.ma like :text) and delected = :delected
    """,nativeQuery = true)
    Page<CameraResponce> searchCamera(@Param("text") String text, Pageable pageable,@Param("delected")Integer delected);
}
