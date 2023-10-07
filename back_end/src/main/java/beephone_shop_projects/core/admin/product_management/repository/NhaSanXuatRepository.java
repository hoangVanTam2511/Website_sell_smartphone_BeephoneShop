package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.NhaSanXuat;
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
public interface NhaSanXuatRepository extends INhaSanXuatRepository {
    Page<NhaSanXuat> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  nha_san_xuat SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<NhaSanXuat> findAllByDelected(Boolean delected);

    NhaSanXuat findByTenNhaSanXuat(String tenNhaSanXuat);

    @Query(value = """
    SELECT SUBSTRING(ma,10) + 1  FROM nha_san_xuat ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();
}
