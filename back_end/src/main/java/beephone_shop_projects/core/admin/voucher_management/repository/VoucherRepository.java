package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.repository.IVoucherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends IVoucherRepository {

    @Query(value = """
                SELECT v.id, v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai FROM voucher v
            """, nativeQuery = true)
    Page<VoucherResponse> getAllVoucher(Pageable pageable);

    @Query(value = """
             SELECT v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
             v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai FROM voucher v
             WHERE v.ma = ?1
            """, nativeQuery = true)
    VoucherResponse getOneVoucher(String ma);

//    @Query(value = """
//             SELECT v.ma, v.ten, v.ngay_bat_dau as ngayBatDau,
//             v.ngay_ket_thuc as ngayKetThuc,v.gia_tri_voucher as giaTriVoucher, v.trang_thai as trangThai FROM voucher v
//             WHERE v.ma = ?1
//            """, nativeQuery = true)
//    Voucher getVoucher(String ma);

}
