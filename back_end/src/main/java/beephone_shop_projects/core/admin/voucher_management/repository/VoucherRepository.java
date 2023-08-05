package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.repository.IVoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;

@Repository
public interface VoucherRepository extends IVoucherRepository {

    @Query(value = """
                 SELECT v.id, v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc, v.gia_tri_voucher as giaTriVoucher,
                  v.trang_thai as trangThai FROM voucher v
            """, nativeQuery = true)
    Page<VoucherResponse> getAllVoucher(Pageable pageable);

    @Query(value = """
              SELECT v.id, v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher,
                  v.trang_thai as trangThai FROM voucher v
             WHERE v.ma = ?1
            """, nativeQuery = true)
    VoucherResponse getOneVoucher(String ma);

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
            SELECT v.id, v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
                  v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher,
                   v.trang_thai as trangThai FROM voucher v
                  WHERE
                     v.ma LIKE :ma
                   OR
            v.ten LIKE  :ten
                    OR
            v.ngay_bat_dau LIKE :ngayBatDau
                    OR
            v.ngay_ket_thuc LIKE :ngayKetThuc
                    OR
            v.gia_tri_voucher LIKE :giaTriVoucher
                    OR
            v.trang_thai LIKE :trangThai
                  """, nativeQuery = true)
    Page<VoucherResponse> timKiemVoucher(@Param("ma") String ma,
                                         @Param("ten") String ten,
                                         @Param("ngayBatDau") Date ngayBatDau,
                                         @Param("ngayKetThuc") Date ngayKetThuc,
                                         @Param("giaTriVoucher") String giaTriVoucher,
                                         @Param("trangThai") String trangThai, Pageable pageable);


//    @Query(value = """
//           SELECT v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
//                 v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher,
//                  v.trang_thai as trangThai FROM voucher v
//                          WHERE
//                          (v.ma LIKE %:#{#req.ma}% OR %:#{#req.ma}% IS NULL OR %:#{#req.ma}% LIKE '')
//                          AND
//                          (v.ten LIKE %:#{#req.ten}% OR %:#{#req.ten}% IS NULL OR %:#{#req.ten}% LIKE '')
//                          AND
//                          (v.ngayBatDau LIKE %:#{#req.ngayBatDau}% OR %:#{#req.ngayBatDau}% IS NULL OR %:#{#req.ngayBatDau}% LIKE '')
//                          AND
//                          (v.ngayKetThuc LIKE %:#{#req.ngayKetThuc}% OR %:#{#req.ngayKetThuc}% IS NULL OR %:#{#req.ngayKetThuc}% LIKE '')
//                          AND
//                          (v.giaTriVoucher LIKE %:#{#req.giaTriVoucher}% OR %:#{#req.giaTriVoucher}% IS NULL OR %:#{#req.giaTriVoucher}% LIKE '')
//                          AND
//                          (v.trang_thai LIKE %:#{#req.trangThai}% OR %:#{#req.trangThai}% IS NULL OR %:#{#req.trangThai}% LIKE '')
//                                        """, nativeQuery = true)
//    Page<VoucherResponse> timKiemVoucher(@Param("req")FindVoucherRequest request, Pageable pageable);

//    @Query(value = """
//             SELECT v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
//             v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai FROM voucher v
//             WHERE v.ma = ?1
//            """, nativeQuery = true)
//    Voucher getVoucher(String ma);

}
