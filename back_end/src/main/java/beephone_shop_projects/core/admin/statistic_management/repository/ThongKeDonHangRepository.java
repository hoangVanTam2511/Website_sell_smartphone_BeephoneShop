package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeTrangThaiDonHang;
import beephone_shop_projects.repository.IHoaDonRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeDonHangRepository extends IHoaDonRepository {

    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
            WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9);
                          """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangAll();

    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
            WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9) 
            AND YEAR(created_at) = :#{#request.year} AND MONTH(created_at) = :#{#request.month}
            GROUP BY YEAR(created_at), MONTH(created_at);
                          """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request);

    @Query(value = """
          SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
          WHERE DATE(created_at) = CURDATE() AND (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInDay();


    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
                                      WHERE trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9
                                        AND YEAR(created_at) = YEAR(CURDATE())
                                        AND MONTH(created_at) = MONTH(CURDATE())
                                      GROUP BY YEAR(created_at), MONTH(created_at);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInMonth();

    @Query(value = """
        SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien, DATE(created_at) AS ngayTao FROM hoa_don
        WHERE (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9)
        AND (:#{#request.date1} IS NULL OR :#{#request.date2} IS NULL
        OR DATE(created_at) BETWEEN :#{#request.date1} AND :#{#request.date2})
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) ASC
        """, nativeQuery = true)
    List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(@Param("request") ThongKeKhoangNgayDonHangRequest request);

    @Query(value = """
          SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
          WHERE DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND (trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInYesterday();

    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
                                      WHERE trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9
                                      AND (YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)))
                                      GROUP BY YEAR(created_at), MONTH(created_at);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangLastMonth();

    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
                                      WHERE trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9
                                      AND YEAR(created_at) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))
                                      GROUP BY YEAR(created_at);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangLastYear();

    @Query(value = """
            SELECT COUNT(id) AS soLuong, COALESCE(SUM(tong_tien_sau_khi_giam), 0) - COALESCE(SUM(tien_tra_hang), 0) AS tongTien FROM hoa_don
                                      WHERE trang_thai != 0 AND trang_thai != 6 AND trang_thai != 5 AND trang_thai != 9
                                      AND YEAR(created_at) = YEAR(CURDATE())
                                      GROUP BY YEAR(created_at);
                        """, nativeQuery = true)
    ThongKeDonHangResponse getDonHangInYear();

    @Query(value = """
                SELECT
                               sub_query.chonTheo,
                               trang_thai,
                               COUNT(trang_thai) AS so_luong,
                               ROUND((COUNT(trang_thai) / sub_query.total * 100), 2) AS phan_tram
                           FROM hoa_don
                           CROSS JOIN (
                               SELECT
                                   CASE
                                       WHEN :chonTheo = 'ngay' THEN DATE(created_at)
                                       WHEN :chonTheo = 'tuan' THEN CONCAT(YEAR(created_at), '/', WEEK(created_at))
                                       WHEN :chonTheo = 'thang' THEN CONCAT(YEAR(created_at), '/', MONTH(created_at))
                                       WHEN :chonTheo = 'nam' THEN YEAR(created_at)
                                   END AS chonTheo,
                                   COUNT(*) AS total
                               FROM hoa_don
                               WHERE
                                   CASE
                                       WHEN :chonTheo = 'ngay' THEN DATE(created_at) = (CURRENT_DATE)
                                       WHEN :chonTheo = 'tuan' THEN (WEEK(created_at) = WEEK(CURRENT_DATE) AND YEAR(created_at) = YEAR(CURRENT_DATE))
                                       WHEN :chonTheo = 'thang' THEN (YEAR(created_at) = YEAR(CURRENT_DATE) AND MONTH(created_at) = MONTH(CURRENT_DATE))
                                       WHEN :chonTheo = 'nam' THEN YEAR(created_at) = YEAR(CURRENT_DATE)
                                   END
                               GROUP BY chonTheo
                           ) AS sub_query
                           WHERE
                               CASE
                                   WHEN :chonTheo = 'ngay' THEN DATE(hoa_don.created_at) = sub_query.chonTheo
                                   WHEN :chonTheo = 'tuan' THEN (CONCAT(YEAR(hoa_don.created_at), '/', WEEK(hoa_don.created_at)) = sub_query.chonTheo)
                                   WHEN :chonTheo = 'thang' THEN (CONCAT(YEAR(hoa_don.created_at), '/', MONTH(hoa_don.created_at)) = sub_query.chonTheo)
                                   WHEN :chonTheo = 'nam' THEN YEAR(hoa_don.created_at) = sub_query.chonTheo
                               END
                           GROUP BY sub_query.chonTheo, trang_thai;
                           
            """, nativeQuery = true)
    List<ThongKeTrangThaiDonHang> getAllTrangThaiDonHang(@Param("chonTheo") String chonTheo);






}
