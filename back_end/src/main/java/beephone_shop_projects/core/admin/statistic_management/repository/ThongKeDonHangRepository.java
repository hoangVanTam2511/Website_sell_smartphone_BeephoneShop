package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.repository.IHoaDonChiTietRepository;
import beephone_shop_projects.repository.IHoaDonRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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


}
