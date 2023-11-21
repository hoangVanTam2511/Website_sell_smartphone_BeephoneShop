package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamTop5Response;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeSanPhamRepository extends ISanPhamChiTietRepository {

    @Query(value = """
         SELECT SUM(so_luong) AS soLuong FROM hoa_don_chi_tiet
                        """, nativeQuery = true)
    ThongKeSanPhamResponse getSanPham();

    @Query(value = """
    SELECT a.id, a.ten_san_pham, MAX(f.path) AS path, SUM(h.so_luong) AS so_luong
    FROM san_pham a LEFT JOIN san_pham_chi_tiet spct ON a.id = spct.id_san_pham
    LEFT JOIN image f ON spct.id_image = f.id
    LEFT JOIN hoa_don_chi_tiet h ON spct.id = h.id_chi_tiet_san_pham
    GROUP BY a.id
    ORDER BY so_luong DESC
    LIMIT 3;
    """, nativeQuery = true)
    List<ThongKeSanPhamTop5Response> getSanPhamTop5();


}
