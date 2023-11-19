package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeDonHangRepository;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThongKeDonHangServiceImpl implements ThongKeDonHangService {

    @Autowired
    private ThongKeDonHangRepository thongKeDonHangRepository;

    @Override
    public ThongKeDonHangResponse xemThongKeTheoNgay() {
        return thongKeDonHangRepository.getDonHangInDay();
    }

    @Override
    public ThongKeDonHangResponse xemThongKeTheoThang() {
        return thongKeDonHangRepository.getDonHangInMonth();
    }

    @Override
    public ThongKeSanPhamResponse xemSanPham() {
        return thongKeDonHangRepository.getSanPham();
    }

}
