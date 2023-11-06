package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.repository.IKhuyenMaiChiTietRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KhuyenMaiChiTietRepository extends IKhuyenMaiChiTietRepository {

//    @Modifying
//    @Transactional
//    @Query(value = """
//             UPDATE khuyen_mai_chi_tiet SET delected = :delected
//             where id_khuyen_mai = :id
//            """, nativeQuery = true)
//    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM khuyen_mai_chi_tiet WHERE id_khuyen_mai = :id", nativeQuery = true)
    void updateDelected(@Param("id") String id);
}
