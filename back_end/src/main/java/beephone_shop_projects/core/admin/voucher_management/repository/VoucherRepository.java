package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.repository.IVoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface VoucherRepository extends IVoucherRepository, CustomVoucherRepository {

    @Query("SELECT V FROM Voucher V WHERE V.trangThai  = 1 AND  V.soLuong > 0")
    List<Voucher> getAllVoucherList();

    @Query(value = "SELECT v FROM Voucher v")
    List<Voucher> getSttVoucher();

    @Query(value = """
             SELECT v.id, v.ma, v.ten, v.so_luong as soLuong,
                 v.gia_tri_toi_da as giaTriToiDa, 
                 v.loai_voucher as loaiVoucher, 
                  v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,
                  v.gia_tri_voucher as giaTriVoucher,
                  v.dieu_kien_ap_dung as dieuKienApDung,
                  v.trang_thai as trangThai 
                  FROM voucher v WHERE v.id = ?1
            """, nativeQuery = true)
    VoucherResponse getOneVoucher(String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Voucher v
            SET v.trangThai = CASE
                WHEN v.trangThai = 1 THEN 4
               WHEN v.trangThai = 3 THEN 4
               WHEN v.trangThai = 4 THEN 1
               WHEN v.trangThai = 4 THEN 3
                ELSE v.trangThai
            END
            WHERE v.id = :idBanGhi
            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Query(value = """
            SELECT v FROM Voucher v WHERE :date1 BETWEEN v.ngayBatDau AND v.ngayKetThuc AND v.trangThai <> :status
            """)
    List<Voucher> checkToStartBeforDateNowAndStatus(@Param("date1") Date dateTime, @Param("status") StatusDiscount status);

    @Query(value = """
            SELECT v FROM Voucher v WHERE :date1 BETWEEN v.ngayBatDau AND v.ngayKetThuc AND v.trangThai = :status
            """)
    List<Voucher> checkToStartBeforDateNowAndStatus1(@Param("date1") Date dateTime, @Param("status") StatusDiscount status);

    @Query(value = """
            SELECT v FROM Voucher v WHERE v.ngayKetThuc < ?1 AND v.trangThai <> ?2
            """)
    List<Voucher> checkEndDateAndStatus(Date dateTime, StatusDiscount status);

    @Query(value = """
            SELECT v FROM Voucher v WHERE v.ngayBatDau > ?1 AND v.trangThai <> ?2
            """)
    List<Voucher> checkToStartAfterAndStatus(Date dateTime, StatusDiscount status);

    @Query(value = """
            SELECT v FROM Voucher  v
            WHERE v.ma = ?1
            """)
    VoucherResponse findCodeVoucher(String code);

    @Query(value = """
            SELECT v.id, v.ma, v.ten, v.so_luong as soLuong, v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai, v.loai_voucher as loaiVoucher, 
             v.dieu_kien_ap_dung as dieuKienApDung, v.ngay_bat_dau as ngayBatDau, v.ngay_ket_thuc as ngayKetThuc, v.gia_tri_toi_da as giaTriToiDa 
             FROM voucher v WHERE (v.trang_thai  = 1 AND  v.so_luong > 0)
             AND ((:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR v.ma LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR v.gia_tri_voucher LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR v.so_luong LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR v.dieu_kien_ap_dung LIKE :#{'%' + #request.keyword + '%'}))
             ORDER BY v.gia_tri_voucher DESC          
            """, nativeQuery = true)
    Page<VoucherResponse> getVoucherStatusIsActive(Pageable pageable, @Param("request") FindVoucherRequest request);

    @Query(value = """
            SELECT v.id, v.ma, v.ten, v.so_luong as soLuong, v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai, v.loai_voucher as loaiVoucher, 
             v.dieu_kien_ap_dung as dieuKienApDung, v.ngay_bat_dau as ngayBatDau, v.ngay_ket_thuc as ngayKetThuc, v.gia_tri_toi_da as giaTriToiDa 
             FROM voucher v WHERE v.so_luong > 0 AND v.trang_thai = 1
            """, nativeQuery = true)
    List<VoucherResponse> getVoucherStatusIsActiveList();

}
