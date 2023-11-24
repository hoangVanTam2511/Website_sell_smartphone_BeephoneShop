package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.repository.IHoaDonRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeDonHangRepository extends IHoaDonRepository {

    @Query(value = """
            SELECT COUNT(id) AS soLuong, SUM(tong_tien) AS tongTien FROM hoa_don
            WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5);
                          """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangAll();

    @Query(value = """
            SELECT COUNT(id) AS soLuong, SUM(tong_tien) AS tongTien FROM hoa_don
            WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5) 
            AND YEAR(created_at) = :#{#request.year} AND MONTH(created_at) = :#{#request.month}
            GROUP BY YEAR(created_at), MONTH(created_at);
                          """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request);

    @Query(value = """
          SELECT COUNT(id) AS soLuong, SUM(tong_tien) AS tongTien FROM hoa_don
          WHERE DATE(created_at) = CURDATE() AND (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInDay();


    @Query(value = """
            SELECT COUNT(id) AS soLuong, SUM(tong_tien) AS tongTien FROM hoa_don
                                      WHERE trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5
                                        AND YEAR(created_at) = YEAR(CURDATE())
                                        AND MONTH(created_at) = MONTH(CURDATE())
                                      GROUP BY YEAR(created_at), MONTH(created_at);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInMonth();

    @Query(value = """
        SELECT COUNT(id) AS soLuong, SUM(tong_tien) AS tongTien, DATE(created_at) AS ngayTao FROM hoa_don
        WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5)
        AND (:#{#request.date1} IS NULL OR :#{#request.date2} IS NULL
        OR DATE(created_at) BETWEEN :#{#request.date1} AND :#{#request.date2})
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) ASC
        """, nativeQuery = true)
    List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(@Param("request") ThongKeKhoangNgayDonHangRequest request);





}
