package beephone_shop_projects.core.admin.transaction_management.repository;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.repository.IHinhThucThanhToanRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TransactionRepository extends IHinhThucThanhToanRepository {

    @Query(value = """
                SELECT h.id AS id, h.ma AS ma, h.so_tien_thanh_toan AS soTienThanhToan, hd.id as idHoaDon, hd.ma AS maHoaDon, h.loai_thanh_toan AS loaiThanhToan, 
                h.hinh_thuc_thanh_toan AS hinhThucThanhToan, h.trang_thai AS trangThai, h.created_at AS ngayTao, h.created_by as idNhanVien
                FROM hinh_thuc_thanh_toan h LEFT JOIN hoa_don hd ON h.id_hoa_don = hd.id  
                WHERE ((:#{#request.keyword} IS NULL OR hd.ma LIKE  :#{'%' + #request.keyword + '%'})
                OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR h.so_tien_thanh_toan LIKE :#{'%' + #request.keyword + '%'}) )
                AND (:#{#request.hinhThucThanhToan} IS NULL OR :#{#request.hinhThucThanhToan} = 3 OR h.hinh_thuc_thanh_toan = :#{#request.hinhThucThanhToan} )
                AND (:#{#request.loaiThanhToan} IS NULL OR  :#{#request.loaiThanhToan} = 3 OR h.loai_thanh_toan = :#{#request.loaiThanhToan} )
                AND (:#{#request.trangThai} IS NULL OR :#{#request.trangThai} = 6 OR h.trang_thai = :#{#request.trangThai} )
                AND ((:#{#request.ngayBatDau} IS NULL AND :#{#request.ngayKetThuc} IS NULL)
                OR ((:#{#request.ngayBatDau} IS NULL OR h.created_at >= :#{#request.ngayBatDau})
                AND (:#{#request.ngayKetThuc} IS NULL OR h.created_at <= :#{#request.ngayKetThuc})))
            """, nativeQuery = true)
    Page<TransactionResponse> getAll(Pageable pageable, @Param("request") TransactionRequest request);

    @Query(value = """
             SELECT a.id, a.ma, a.id_role, a.ho_va_ten FROM account a JOIN role r ON r.id = a.id_role
            WHERE (r.ma = 'role1' OR r.ma = 'role3') AND a.id_role = :idParam;
                  """, nativeQuery = true)
    Optional<Account> getByIdEmployee(@Param("idParam") String id);

}
