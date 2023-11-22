package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamTop5Response;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/thong-ke")
@CrossOrigin("*")
public class ThongKeSanPhamController {

    @Autowired
    private ThongKeSanPhamService thongKeSanPhamService;

    @GetMapping("/san-pham")
    private ThongKeSanPhamResponse getSanPham(){
        return thongKeSanPhamService.xemSanPham();
    }

    @GetMapping("/san-pham-top5")
    private List<ThongKeSanPhamTop5Response> getSanPhamTop5(){
        return thongKeSanPhamService.getSanPhamTop5();
    }
}
