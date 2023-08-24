package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.repository.IAnhRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository

public interface AnhRepository extends IAnhRepository  {

    Page<Anh> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  anh SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    @Query(value = """
    SELECT CONCAT( 'ANH_',SUBSTRING(ma,5) + 1)   FROM chip
    """,nativeQuery = true)
    String getNewCode();
}
