package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.BrandResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.CameraResponce;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.repository.INhaSanXuatRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends INhaSanXuatRepository {
    Page<Hang> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  hang SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Hang> findAllByDelected(Boolean delected);

    List<Hang> findBytenHang(String tenHang);

    @Query(value = """
    SELECT SUBSTRING(ma,10) + 1  FROM hang ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
        SELECT ROW_NUMBER() OVER() AS stt, hang.id, hang.ma, hang.ten_hang from hang as hang
        WHERE  (hang.ten_hang like :text or hang.ma like :text) and hang.delected = :delected
    """,nativeQuery = true)
    Page<BrandResponce> searchHang(@Param("text") String text, Pageable pageable,@Param("delected") Integer delected);
}
