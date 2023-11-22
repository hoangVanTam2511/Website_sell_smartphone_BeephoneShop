package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamBanChayResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamSapHetHang;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ThongKeSanPhamRepository extends ISanPhamChiTietRepository {

    @Query(value = """
            SELECT SUM(h.so_luong) AS so_luong FROM hoa_don_chi_tiet h
            LEFT JOIN hoa_don hd ON h.id_hoa_don = hd.id
            WHERE hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5
            AND YEAR(hd.created_at) = YEAR(CURDATE())
            AND MONTH(hd.created_at) = MONTH(CURDATE())
            GROUP BY YEAR(hd.created_at), MONTH(hd.created_at)
                           """, nativeQuery = true)
    ThongKeSanPhamResponse getSanPham();

    @Query(value = """
                SELECT a.id, a.ten_san_pham, MAX(f.path) AS path, SUM(h.so_luong) AS so_luong
                FROM san_pham a 
                LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                LEFT JOIN image f ON spct.id_image = f.id
                LEFT JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
                LEFT JOIN hoa_don hd ON h.id_hoa_don = hd.id
                WHERE 
                    hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5
                    AND (
                        (:chonTheo = 'ngay' AND DATE(spct.created_at) = CURRENT_DATE) OR
                        (:chonTheo = 'tuan' AND WEEK(spct.created_at) = WEEK(CURRENT_DATE)) OR
                        (:chonTheo = 'thang' AND YEAR(spct.created_at)*100 + MONTH(spct.created_at) = YEAR(CURRENT_DATE)*100 + MONTH(CURRENT_DATE)) OR
                        (:chonTheo = 'nam' AND YEAR(spct.created_at) = YEAR(CURRENT_DATE))
                    )
                GROUP BY 
                    CASE 
                        WHEN :chonTheo = 'ngay' THEN DATE(spct.created_at)
                        WHEN :chonTheo = 'tuan' THEN WEEK(spct.created_at)
                        WHEN :chonTheo = 'thang' THEN YEAR(spct.created_at)*100 + MONTH(spct.created_at)
                        WHEN :chonTheo = 'nam' THEN YEAR(spct.created_at)
                    END, 
                    a.id
                ORDER BY so_luong DESC
            """, nativeQuery = true)
    List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay(@Param("chonTheo") String chonTheo);

    @Query(value = """
            SELECT a.id, a.ten_san_pham, MAX(f.path) AS path, SUM(spct.so_luong_ton_kho) AS so_luong 
            FROM san_pham a 
            LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham 
            LEFT JOIN image f ON spct.id_image = f.id 
            WHERE
               CASE
                WHEN :chonTheo = 'ngay' THEN DATE(spct.created_at) = CURRENT_DATE 
                WHEN :chonTheo = 'tuan' THEN WEEK(spct.created_at) = WEEK(CURRENT_DATE) 
                WHEN :chonTheo = 'thang' THEN YEAR(spct.created_at)*100 + MONTH(spct.created_at) = YEAR(CURRENT_DATE)*100 + MONTH(CURRENT_DATE) 
                WHEN :chonTheo = 'nam' THEN YEAR(spct.created_at) = YEAR(CURRENT_DATE) 
               END 
            GROUP BY 
               CASE 
                WHEN :chonTheo = 'ngay' THEN DATE(spct.created_at) 
                WHEN :chonTheo = 'tuan' THEN WEEK(spct.created_at) 
                WHEN :chonTheo = 'thang' THEN YEAR(spct.created_at)*100 + MONTH(spct.created_at) 
                WHEN :chonTheo = 'nam' THEN YEAR(spct.created_at) 
              END, 
               a.id
            ORDER BY so_luong ASC """, nativeQuery = true)
    List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang(@Param("chonTheo") String chonTheo);

    @Query( value = """
                    SELECT SUM(h.so_luong) AS so_luong, DATE(hd.created_at) AS ngay_tao
                                    FROM san_pham a
                                    LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
                                    LEFT JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
                                    LEFT JOIN hoa_don hd ON h.id_hoa_don = hd.id
                                    WHERE (hd.trang_thai != 0 AND hd.trang_thai != 6 AND hd.trang_thai != 5)
                                    AND DATE(hd.created_at) between :date1 and :date2
                                    GROUP BY DATE(hd.created_at)
                                    ORDER BY DATE(hd.created_at) ASC;
            """, nativeQuery = true)
    List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(@Param("date1") Date date1, @Param("date2") Date date2);








}
