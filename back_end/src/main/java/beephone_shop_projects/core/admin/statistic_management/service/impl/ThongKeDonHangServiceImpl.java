package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeDonHangRepository;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ThongKeDonHangServiceImpl implements ThongKeDonHangService {

    @Autowired
    private ThongKeDonHangRepository thongKeDonHangRepository;

    @Override
    public ThongKeDonHangResponse getDonHangAll() {
        return thongKeDonHangRepository.getDonHangAll();
    }

    @Override
    public ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request) {
        return thongKeDonHangRepository.getDonHangAllTheoNam(request);
    }

    @Override
    public ThongKeDonHangResponse getDonHangInMonth() {
        return thongKeDonHangRepository.getDonHangInMonth();
    }

    @Override
    public ThongKeDonHangResponse getDonHangInDay() {
        return thongKeDonHangRepository.getDonHangInDay();
    }

    @Override
    public List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(Date date1, Date date2) {
        return thongKeDonHangRepository.getDonHangKhoangNgay(date1, date2);
    }


}
