package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgaySanPhamRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.*;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeSanPhamRepository extends ISanPhamChiTietRepository {

    @Query(value = """
            SELECT COUNT(i.id) AS so_luong FROM hoa_don_chi_tiet h
            JOIN hoa_don hd ON h.id_hoa_don = hd.id
            JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
            WHERE hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5 AND hd.trang_thai != 9 AND i.trang_thai = 1
            AND YEAR(hd.created_at) = YEAR(CURDATE())
            AND MONTH(hd.created_at) = MONTH(CURDATE())
            GROUP BY YEAR(hd.created_at), MONTH(hd.created_at)
                           """, nativeQuery = true)
    ThongKeSanPhamResponse getSanPham();

    @Query(value = """
                SELECT
                    spct.id,
                    a.ten_san_pham,
                    MAX(f.path) AS path,
                    COUNT(i.id) AS so_luong,
                    spct.don_gia,
                    ra.dung_luong AS dung_luong_ram,
                    ro.dung_luong AS dung_luong_rom,
                    m.ten_mau_sac
                FROM san_pham a
                    LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                    LEFT JOIN image f ON spct.id_image = f.id
                    JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
                    JOIN hoa_don hd ON h.id_hoa_don = hd.id
                    JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
                    LEFT JOIN mau_sac m ON spct.id_mau_sac = m.id
                    LEFT JOIN ram ra ON spct.id_ram = ra.id
                    LEFT JOIN rom ro ON spct.id_rom = ro.id
                WHERE
                    hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5 AND hd.trang_thai != 9 AND i.trang_thai = 1
                    AND 
                    CASE
                        WHEN :chonTheo = 'ngay' THEN DATE(hd.created_at) = (CURRENT_DATE) 
                        WHEN :chonTheo = 'tuan' THEN (WEEK(hd.created_at) = WEEK(CURRENT_DATE) AND YEAR(hd.created_at) = YEAR(CURRENT_DATE))
                        WHEN :chonTheo = 'thang' THEN (YEAR(hd.created_at) = YEAR(CURRENT_DATE) AND MONTH(hd.created_at) = MONTH(CURRENT_DATE)) 
                        WHEN :chonTheo = 'nam' THEN YEAR(hd.created_at) = YEAR(CURRENT_DATE) 
               END
                GROUP BY
                    CASE
                        WHEN :chonTheo = 'ngay' THEN DATE(hd.created_at)
                        WHEN :chonTheo = 'tuan' THEN (WEEK(hd.created_at) = WEEK(CURRENT_DATE) AND YEAR(hd.created_at) = YEAR(CURRENT_DATE))
                        WHEN :chonTheo = 'thang' THEN (YEAR(hd.created_at) = YEAR(CURRENT_DATE) AND MONTH(hd.created_at) = MONTH(CURRENT_DATE)) 
                        WHEN :chonTheo = 'nam' THEN YEAR(hd.created_at)
                    END,
                    spct.id, a.ten_san_pham, spct.don_gia, ra.dung_luong, ro.dung_luong, m.ten_mau_sac
                ORDER BY
                    so_luong DESC
            """, nativeQuery = true)
    List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay(@Param("chonTheo") String chonTheo);

    @Query(value = """
            SELECT
                spct.id,
                a.ten_san_pham,
                f.path AS path,
                spct.so_luong_ton_kho AS so_luong,
                spct.don_gia,
                ra.dung_luong AS dung_luong_ram,
                ro.dung_luong AS dung_luong_rom,
                m.ten_mau_sac
            FROM san_pham a
                LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                LEFT JOIN image f ON spct.id_image = f.id
                LEFT JOIN mau_sac m ON spct.id_mau_sac = m.id
                LEFT JOIN ram ra ON spct.id_ram = ra.id
                LEFT JOIN rom ro ON spct.id_rom = ro.id
                HAVING so_luong < 10 AND so_luong > 0
                ORDER BY so_luong ASC """, nativeQuery = true)
    List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang();

    @Query(value = """
            SELECT COUNT(i.id) AS so_luong, DATE(hd.created_at) AS ngay_tao
                FROM san_pham a
                LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
                JOIN hoa_don hd ON h.id_hoa_don = hd.id
                JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
                WHERE (hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5 AND hd.trang_thai != 9) AND i.trang_thai = 1
                AND (:#{#request.date1} IS NULL OR :#{#request.date2} IS NULL
                OR DATE(hd.created_at) BETWEEN :#{#request.date1} AND :#{#request.date2})
                GROUP BY DATE(hd.created_at)
                ORDER BY DATE(hd.created_at) ASC;
            """, nativeQuery = true)
    List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(@Param("request") ThongKeKhoangNgaySanPhamRequest request);

    @Query(value = """
            SELECT COUNT(i.id) AS so_luong FROM hoa_don_chi_tiet h
            JOIN hoa_don hd ON h.id_hoa_don = hd.id
            JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
            WHERE hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5 AND hd.trang_thai != 9 AND i.trang_thai = 1
            AND YEAR(hd.created_at) = YEAR(CURDATE())
            AND MONTH(hd.created_at) = MONTH(CURDATE())
            GROUP BY YEAR(hd.created_at), MONTH(hd.created_at)
                           """, nativeQuery = true)
    ThongKeSanPhamResponse getSanPhamInMonth();

    @Query(value = """
            SELECT COUNT(i.id) AS so_luong FROM hoa_don_chi_tiet h
            JOIN hoa_don hd ON h.id_hoa_don = hd.id
            JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
            WHERE hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5 AND hd.trang_thai != 9 AND i.trang_thai = 1
            AND (YEAR(hd.created_at) = YEAR(CURDATE()) AND MONTH(hd.created_at) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)))
            GROUP BY YEAR(hd.created_at), MONTH(hd.created_at)
                           """, nativeQuery = true)
    ThongKeSanPhamResponse getSanPhamLastMonth();

    @Query(value = """
            SELECT
                spct.id,
                a.ten_san_pham,
                MAX(f.path) AS path,
                COUNT(i.id) AS so_luong,
                spct.don_gia,
                ra.dung_luong AS dung_luong_ram,
                ro.dung_luong AS dung_luong_rom,
                m.ten_mau_sac
            FROM
                san_pham a
                LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                LEFT JOIN image f ON spct.id_image = f.id
                JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
                JOIN hoa_don hd ON h.id_hoa_don = hd.id
                JOIN imei_da_ban i ON i.id_hoa_don_chi_tiet = h.id
                LEFT JOIN mau_sac m ON spct.id_mau_sac = m.id
                LEFT JOIN ram ra ON spct.id_ram = ra.id
                LEFT JOIN rom ro ON spct.id_rom = ro.id
            WHERE
                (hd.trang_thai = 8 OR hd.trang_thai = 9) AND i.trang_thai = 4
            GROUP BY
                spct.id, a.ten_san_pham, spct.don_gia, ra.dung_luong, ro.dung_luong, m.ten_mau_sac
            ORDER BY
                so_luong DESC
                                    """, nativeQuery = true)
    List<ThongKeSanPhamDoiTraResponse> getSanPhamDoiTra();
}
