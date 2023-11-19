package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/thong-ke")
@CrossOrigin("*")
public class ThongKeDonHangController {

    @Autowired
    private ThongKeDonHangService thongKeDonHangService;

    @GetMapping("/in-day")
    private ThongKeDonHangResponse getDonHangInDay(){
        return thongKeDonHangService.xemThongKeTheoNgay();
    }

    @GetMapping("/in-month")
    private ThongKeDonHangResponse getDonHangInMonth(){
        return thongKeDonHangService.xemThongKeTheoThang();
    }

    @GetMapping("/san-pham")
    private ThongKeSanPhamResponse getSanPham(){
        return thongKeDonHangService.xemSanPham();
    }

}
