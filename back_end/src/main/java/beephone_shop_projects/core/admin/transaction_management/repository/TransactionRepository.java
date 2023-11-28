package beephone_shop_projects.core.admin.transaction_management.repository;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.repository.IHinhThucThanhToanRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends IHinhThucThanhToanRepository {

    @Query("""
            SELECT h.id AS id, h.ma AS ma, h.soTienThanhToan AS soTienThanhToan, hd.id as idHoaDon, hd.ma AS maHoaDon, h.loaiThanhToan AS loaiThanhToan, 
            h.nguoiXacNhan AS nguoiXacNhan, h.hinhThucThanhToan AS hinhThucThanhToan, h.trangThai AS trangThai, h.createdAt AS ngayTao
            FROM HinhThucThanhToan h JOIN HoaDon hd ON h.hoaDon.id = hd.id WHERE 
            ((:#{#request.maHoaDon} IS NULL OR hd.ma LIKE CONCAT('%', COALESCE(:#{#request.maHoaDon}, ''), '%'))
            OR (:#{#request.soTienThanhToan} IS NULL OR h.soTienThanhToan = COALESCE(:#{#request.soTienThanhToan}, h.soTienThanhToan)))
            AND (:#{#request.hinhThucThanhToan} IS NULL OR :#{#request.hinhThucThanhToan} = 3 OR h.hinhThucThanhToan = :#{#request.hinhThucThanhToan} )
            AND (:#{#request.loaiThanhToan} IS NULL OR  :#{#request.loaiThanhToan} = 3 OR h.loaiThanhToan = :#{#request.loaiThanhToan} )
            AND (:#{#request.trangThai} IS NULL OR :#{#request.trangThai} = 6 OR h.trangThai = :#{#request.trangThai} )
            AND (:#{#request.ngayBatDau} IS NULL OR :#{#request.ngayKetThuc} IS NULL 
            OR h.createdAt BETWEEN :#{#request.ngayBatDau} AND :#{#request.ngayKetThuc})
                        """)
    Page<TransactionResponse> getAll(Pageable pageable, @Param("request") TransactionRequest request);

}
