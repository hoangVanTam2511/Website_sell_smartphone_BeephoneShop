package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeTocDoTangTruongCustom;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeTrangThaiDonHang;

import java.util.List;

public interface ThongKeDonHangService {

    ThongKeDonHangResponse getDonHangAll();


    ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request);

    ThongKeDonHangResponse getDonHangInMonth();

    ThongKeDonHangResponse getDonHangInDay();

    List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(ThongKeKhoangNgayDonHangRequest request);

    ThongKeTocDoTangTruongCustom getTocDoTangTruongCuaHang();

    List<ThongKeTrangThaiDonHang> getAllTrangThaiDonHang(String chonTheo);



}
