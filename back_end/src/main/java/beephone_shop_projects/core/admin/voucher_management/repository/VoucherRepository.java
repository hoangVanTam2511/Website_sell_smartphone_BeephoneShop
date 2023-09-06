package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.repository.IVoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoucherRepository extends IVoucherRepository, CustomVoucherRepository{

    @Query(value = """
             SELECT v.id, v.ma, v.ten, v.so_luong as soLuong,
                 v.dieu_kien_ap_dung as dieuKienApDung, 
                  v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,
                  v.gia_tri_voucher as giaTriVoucher,
                  v.trang_thai as trangThai FROM voucher v
             WHERE v.id = ?1
            """, nativeQuery = true)
    VoucherResponse getOneVoucher(String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Voucher v
            SET v.trangThai = CASE
                WHEN v.trangThai = 1 THEN 2
                WHEN v.trangThai = 2 THEN 1
                ELSE v.trangThai
            END
            WHERE v.id = :idBanGhi

            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Query(value = """
           SELECT v.id, v.ma, v.ten, v.so_luong as soLuong,
                 v.dieu_kien_ap_dung as dieuKienApDung, 
                 v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,
                 v.gia_tri_voucher as giaTriVoucher,
                 v.trang_thai as trangThai FROM voucher v
                 WHERE v.ma LIKE CONCAT('%', :req.ma, '%')
                 OR v.ten LIKE CONCAT('%', :req.ten, '%')
                 OR v.gia_tri_voucher LIKE CONCAT('%', :req.giaTriVoucher, '%')
                 AND v.ngay_bat_dau LIKE CONCAT('%',:req.ngayBatDau,'%')
                 AND v.ngay_ket_thuc LIKE CONCAT('%',:req.ngayKetThuc,'%')
                 AND v.trang_thai = :req.trangThai
                  """, nativeQuery = true)
    Page<Voucher> timKiemVoucher(@Param("req")FindVoucherRequest request,
                                 Pageable pageable);


}
