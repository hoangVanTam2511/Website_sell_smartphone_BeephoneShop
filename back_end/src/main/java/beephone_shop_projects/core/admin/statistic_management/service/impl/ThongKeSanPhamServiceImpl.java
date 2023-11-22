package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamTop5Response;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeSanPhamRepository;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<ThongKeSanPhamTop5Response> getSanPhamTop5() {
        return thongKeSanPhamRepository.getSanPhamTop5();
    }

}
