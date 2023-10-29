package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.ProductLineResponce;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.repository.IDongSanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductLineRepository extends IDongSanPhamRepository {
    Page<DongSanPham> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  dong_san_pham SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<DongSanPham> findAllByDelected(Boolean delected);

    List<DongSanPham> findByTenDongSanPham(String tenDongSanPham);

    @Query(value = """
    SELECT SUBSTRING(ma,14) + 1  FROM dong_san_pham ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, pdl.id, pdl.ma, 
            pdl.ten_dong_san_pham
            FROM dong_san_pham AS pdl
            WHERE (pdl.ten_dong_san_pham LIKE :text 
            OR pdl.ma LIKE :text ) AND delected = :delected
            """, nativeQuery = true)
    Page<ProductLineResponce> searchProductLine(@Param("text") String text, Pageable pageable, @Param("delected")Integer delected);
}
