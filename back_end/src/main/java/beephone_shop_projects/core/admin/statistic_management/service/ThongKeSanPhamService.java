package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamBanChayResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamSapHetHang;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ThongKeSanPhamService {

    ThongKeSanPhamResponse xemSanPham();

    List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay(String chonTheo);

    List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang(String chonTheo);

    List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(Date date1, Date date2);

}
