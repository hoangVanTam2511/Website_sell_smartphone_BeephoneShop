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

import java.util.ArrayList;


@Repository

public interface ImageRepository extends IAnhRepository {

    Page<Anh> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
             UPDATE  anh SET delected = :delected 
             where id = :id
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);

    @Query(value = """
             SELECT SUBSTRING(ma,5) + 1 FROM anh ORDER BY ma DESC LIMIT 0,1
            """, nativeQuery = true)
    String getNewCode();

    @Query(value = """
             SELECT * FROM anh WHERE  id_chi_tiet_san_pham = :idChiTietSanPham
            """ , nativeQuery = true)
    ArrayList<Anh> findByIDChiTietSanPham(@Param("idChiTietSanPham") String idChiTietSanPham);
}
