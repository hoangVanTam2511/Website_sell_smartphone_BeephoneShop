package beephone_shop_projects.core.admin.statistic_management.service;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ThongKeDonHangService {

    ThongKeDonHangResponse getDonHangAll();


    ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request);

    ThongKeDonHangResponse getDonHangInMonth();

    ThongKeDonHangResponse getDonHangInDay();

    List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(Date date1, Date date2);



}
