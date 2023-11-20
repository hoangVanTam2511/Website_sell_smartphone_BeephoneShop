package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.repository.IKhuyenMaiChiTietRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KhuyenMaiChiTietRepository extends IKhuyenMaiChiTietRepository {

    @Modifying
    @Transactional
    @Query(value = """
             UPDATE khuyen_mai_chi_tiet SET delected = :delected
             where id_khuyen_mai = :id and id_chi_tiet_san_pham = :idSP
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id, @Param("idSP") String idSP);

    //    @Modifying
//    @Transactional
//    @Query(value = "DELETE FROM khuyen_mai_chi_tiet WHERE id_khuyen_mai = :id AND id_chi_tiet_san_pham = :idSP", nativeQuery = true)
//    void updateDelected(@Param("id") String id, @Param("idSP") String idSP);
    @Query(value = """
            SELECT * FROM khuyen_mai_chi_tiet k WHERE k.id_khuyen_mai = :idKhuyenMai AND k.id_chi_tiet_san_pham = :idSanPham
            """, nativeQuery = true)
    KhuyenMaiChiTiet findSPKM(@Param("idKhuyenMai") String idKhuyenMai, @Param("idSanPham") String idSanPham);
}

