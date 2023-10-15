package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.repository.IKhuyenMaiRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface KhuyenMaiRepository extends IKhuyenMaiRepository, CustomKhuyenMaiRepository {

    @Query(value = """
            SELECT k.id, k.ma, k.ten_khuyen_mai, k.gia_tri_khuyen_mai, k.loai_khuyen_mai, k.ngay_bat_dau, 
            k.ngay_ket_thuc, k.trang_thai FROM khuyen_mai k WHERE k.id = ?1
            """, nativeQuery = true)
    KhuyenMaiResponse getOneKhuyenMai(String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE KhuyenMai k
            SET k.trangThai = CASE
                WHEN k.trangThai = 1 THEN 2 
                WHEN k.trangThai = 2 THEN 1
                ELSE k.trangThai
            END
            WHERE k.id = :idBanGhi

            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Query(value = """
            SELECT k FROM KhuyenMai k WHERE :date1 BETWEEN k.ngayBatDau AND k.ngayKetThuc AND k.trangThai <> :status
            """)
    List<KhuyenMai> checkToStartBeforDateNowAndStatus(@Param("date1") Date dateTime, @Param("status") StatusDiscount status);

    @Query(value = """
            SELECT k FROM KhuyenMai k WHERE k.ngayKetThuc < ?1 AND k.trangThai <> ?2
            """)
    List<KhuyenMai> checkEndDateAndStatus(@Param("dateTime") Date dateTime, StatusDiscount status);

    @Query(value = """
            SELECT k FROM KhuyenMai k WHERE k.ngayBatDau > ?1 AND k.trangThai <> ?2
            """)
    List<KhuyenMai> checkToStartAfterAndStatus(@Param("dateTime") Date dateTime, StatusDiscount status);

    @Query(value = """
            SELECT k FROM KhuyenMai k WHERE k.tenKhuyenMai = ?1
            """)
    List<KhuyenMai> findNamePromotion(@Param("tenKhuyenMai") String tenKhuyenMai);
}
