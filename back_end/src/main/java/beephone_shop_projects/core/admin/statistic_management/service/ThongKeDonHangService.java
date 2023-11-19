package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;

public interface ThongKeDonHangService {

    ThongKeDonHangResponse xemThongKeTheoNgay();

    ThongKeDonHangResponse xemThongKeTheoThang();

    ThongKeSanPhamResponse xemSanPham();

}
