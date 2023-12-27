package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgaySanPhamRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.*;
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
    public List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang() {
        return thongKeSanPhamRepository.getSanPhamSapHetHang();
    }

    @Override
    public List<ThongKeSanPhamKhoangNgay> getSanPhamKhoangNgay(ThongKeKhoangNgaySanPhamRequest request) {
        return thongKeSanPhamRepository.getSanPhamKhoangNgay(request);
    }

    @Override
    public List<ThongKeSanPhamDoiTraResponse> getSanPhamDoiTra() {
        return thongKeSanPhamRepository.getSanPhamDoiTra();
    }


}
