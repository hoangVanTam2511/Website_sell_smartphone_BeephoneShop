package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgaySanPhamRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamBanChayResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamSapHetHang;

import java.util.List;

public interface ThongKeSanPhamService {

    ThongKeSanPhamResponse xemSanPham();

    List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay(String chonTheo);

    List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang();

    List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(ThongKeKhoangNgaySanPhamRequest request);

}
