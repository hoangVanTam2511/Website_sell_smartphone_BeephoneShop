package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.DisplayResponce;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.repository.IManHinhRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface DisplayRepository extends IManHinhRepository {
    Page<ManHinh> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  man_hinh SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);


    List<ManHinh> findAllByDelected(Boolean delected);

    List<ManHinh> findByKichThuoc(BigDecimal kichThuoc);

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, display.id, display.ma, 
            display.do_phan_giai, display.kich_thuoc AS kich_thuoc_man_hinh 
            FROM man_hinh AS display
            WHERE (display.do_phan_giai LIKE :text 
            OR display.ma LIKE :text 
            OR display.kich_thuoc LIKE :text)
            AND delected = :delected
            """, nativeQuery = true)
    Page<DisplayResponce> searchDisplayByDelected(@Param("text") String text, Pageable pageable, @Param("delected") Integer delected);

    @Query(value = """
    SELECT SUBSTRING(ma,5) + 1  FROM man_hinh ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

}
