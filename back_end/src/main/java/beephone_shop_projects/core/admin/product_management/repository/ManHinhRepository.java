package beephone_shop_projects.core.admin.product_management.repository;

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

public interface ManHinhRepository extends IManHinhRepository {
    Page<ManHinh> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  man_hinh SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);


    List<ManHinh> findAllByDelected(Boolean delected);

    ManHinh findByKichThuoc(BigDecimal kichThuoc);

    @Query(value = """
    SELECT SUBSTRING(ma,9) + 1  FROM man_hinh ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();
}
