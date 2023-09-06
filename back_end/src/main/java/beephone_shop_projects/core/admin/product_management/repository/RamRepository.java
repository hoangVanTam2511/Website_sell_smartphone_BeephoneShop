package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.repository.IRamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RamRepository extends IRamRepository {
    Page<Ram> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  ram SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Ram> findAllByDelected(Boolean delected);

    Ram findByKichThuoc(Integer kichThuoc);

    @Query(value = """
    SELECT CONCAT( 'RAM_',IF(count(*)  = 0,0,SUBSTRING(ma,5) + 1))   FROM ram
    """,nativeQuery = true)
    String getNewCode();
}
