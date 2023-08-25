package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.repository.IKhuyenMaiRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KhuyenMaiRepository extends IKhuyenMaiRepository, CustomKhuyenMaiRepository {

//    @Query(value = """
//            SELECT k.id, k.ma, k.ten_khuyen_mai, k.muc_giam_gia_theo_phan_tram, k.muc_giam_gia_theo_so_tien, k.ngay_bat_dau,
//            k.ngay_ket_thuc, k.dieu_kien_giam_gia, k.trang_thai FROM khuyen_mai k
//            """, nativeQuery = true)
//    Page<KhuyenMaiResponse> getAllKhuyenMai(Pageable pageable);

    @Query(value = """
            SELECT k.id, k.ma, k.ten_khuyen_mai, k.muc_giam_gia_theo_phan_tram, k.muc_giam_gia_theo_so_tien, k.ngay_bat_dau, 
            k.ngay_ket_thuc, k.dieu_kien_giam_gia, k.trang_thai FROM khuyen_mai k WHERE k.id = ?1
            """, nativeQuery = true)
    KhuyenMaiResponse getOneKhuyenMai(String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE KhuyenMai k
            SET k.trangThai = CASE
                WHEN k.trangThai = true THEN false 
                WHEN k.trangThai = false THEN true
                ELSE k.trangThai
            END
            WHERE k.id = :idBanGhi

            """)
    void doiTrangThai(@Param("idBanGhi") String id);
}
