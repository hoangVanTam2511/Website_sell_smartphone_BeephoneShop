package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamBanChayResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamSapHetHang;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeSanPhamRepository;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ThongKeSanPhamServiceImpl implements ThongKeSanPhamService {

    @Autowired
    private ThongKeSanPhamRepository thongKeSanPhamRepository;

    @Override
    public ThongKeSanPhamResponse xemSanPham() {
        return thongKeSanPhamRepository.getSanPham();
    }

    @Override
    public List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay(String chonTheo) {
        return thongKeSanPhamRepository.getSanPhamBanChay(chonTheo);
    }

    @Override
    public List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang(String chonTheo) {
        return thongKeSanPhamRepository.getSanPhamSapHetHang(chonTheo);
    }

    @Override
    public List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(Date date1, Date date2) {
        return thongKeSanPhamRepository.getSanPhamKhoangNgay(date1, date2);
    }


}
