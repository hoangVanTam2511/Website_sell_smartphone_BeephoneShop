package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamBanChayResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamSapHetHang;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/thong-ke")
@CrossOrigin("*")
public class ThongKeSanPhamController {

    @Autowired
    private ThongKeSanPhamService thongKeSanPhamService;

    // Hàm này lấy ra tổng sản phẩm bán được hàng tháng
    @GetMapping("/san-pham")
    private ThongKeSanPhamResponse getSanPham(){
        return thongKeSanPhamService.xemSanPham();
    }

    // Hàm này lấy ra số lượng những sản phẩm bán chạy
    @GetMapping("/san-pham-ban-chay")
    private List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay( @RequestParam(name = "chonTheo") String chonTheo){
        return thongKeSanPhamService.getSanPhamBanChay(chonTheo);
    }

    //Hàm này lấy ra số lượng sản phẩm sắp hết hàng
    @GetMapping("/san-pham-sap-het-hang")
    private List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang( @RequestParam(name = "chonTheo") String chonTheo ){
        return thongKeSanPhamService.getSanPhamSapHetHang(chonTheo);
    }

    //Hàm này để lấy ra số lượng sản phẩm đã bán được trong ngày
    @GetMapping("/san-pham-khoang-ngay")
    private List<ThongKeSanPhamKhoangNgay> getSanPhamTheoKhoangNgay(@RequestParam(name = "date1") Date date1, @RequestParam(name = "date2") Date date2 ){
        return thongKeSanPhamService.getSanPhamKhoangNgay(date1, date2);
    }
}
