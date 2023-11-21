package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamTop5Response;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThongKeSanPhamService {

    ThongKeSanPhamResponse xemSanPham();

    List<ThongKeSanPhamTop5Response> getSanPhamTop5();

}
