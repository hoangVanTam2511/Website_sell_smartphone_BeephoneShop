package beephone_shop_projects.core.admin.transaction_management.repository;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.repository.IHinhThucThanhToanRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends IHinhThucThanhToanRepository {

    @Query("""
            SELECT h.id AS id, h.ma AS ma, h.soTienThanhToan AS soTienThanhToan, hd.id as idHoaDon, hd.ma AS maHoaDon, h.loaiThanhToan AS loaiThanhToan, 
            h.hinhThucThanhToan AS hinhThucThanhToan, h.trangThai AS trangThai, h.createdAt AS ngayTao, h.createdBy as idNhanVien
            FROM HinhThucThanhToan h JOIN HoaDon hd ON h.hoaDon.id = hd.id  
            WHERE ((:#{#request.keyword} IS NULL OR hd.ma LIKE  :#{'%' + #request.keyword + '%'})
            OR (:#{#request.soTienThanhToan} IS NULL OR h.soTienThanhToan = :#{#request.soTienThanhToan}))
            AND (:#{#request.hinhThucThanhToan} IS NULL OR :#{#request.hinhThucThanhToan} = 3 OR h.hinhThucThanhToan = :#{#request.hinhThucThanhToan} )
            AND (:#{#request.loaiThanhToan} IS NULL OR  :#{#request.loaiThanhToan} = 3 OR h.loaiThanhToan = :#{#request.loaiThanhToan} )
            AND (:#{#request.trangThai} IS NULL OR :#{#request.trangThai} = 6 OR h.trangThai = :#{#request.trangThai} )
            AND (:#{#request.sortValue} IS NULL
                OR (:#{#request.sortValue} = 'a-z' ORDER BY h.soTienThanhToan ASC)
                OR (:#{#request.sortValue} = 'z-a' ORDER BY h.soTienThanhToan DESC))
            AND ((:#{#request.ngayBatDau} IS NULL AND :#{#request.ngayKetThuc} IS NULL)
            OR ((:#{#request.ngayBatDau} IS NULL OR h.createdAt >= :#{#request.ngayBatDau})
            AND (:#{#request.ngayKetThuc} IS NULL OR h.createdAt <= :#{#request.ngayKetThuc})))
            
                        """)
    Page<TransactionResponse> getAll(Pageable pageable, @Param("request") TransactionRequest request);


    @Query(value = """
             SELECT * FROM Account a JOIN Role r ON r.id = a.id_role
            WHERE (r.ma = 'role1' OR r.ma = 'role3') AND a.id = ?1;
                  """, nativeQuery = true)
    Account getByIdEmployee(String id);

}
