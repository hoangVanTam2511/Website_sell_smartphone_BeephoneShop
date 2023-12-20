package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgaySanPhamRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.*;
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
    public ThongKeSanPhamResponse getSanPham(){
        return thongKeSanPhamService.xemSanPham();
    }

    // Hàm này lấy ra số lượng những sản phẩm bán chạy
    @GetMapping("/san-pham-ban-chay")
    public List<ThongKeSanPhamBanChayResponse> getSanPhamBanChay( @RequestParam(name = "chonTheo") String chonTheo){
        return thongKeSanPhamService.getSanPhamBanChay(chonTheo);
    }

    //Hàm này lấy ra số lượng sản phẩm sắp hết hàng
    @GetMapping("/san-pham-sap-het-hang")
    public List<ThongKeSanPhamSapHetHang> getSanPhamSapHetHang(){
        return thongKeSanPhamService.getSanPhamSapHetHang();
    }

    //Hàm này để lấy ra số lượng sản phẩm đã bán được trong ngày
    @GetMapping("/san-pham-khoang-ngay")
    public List<ThongKeSanPhamKhoangNgay> getSanPhamTheoKhoangNgay(final ThongKeKhoangNgaySanPhamRequest request){
        return thongKeSanPhamService.getSanPhamKhoangNgay(request);
    }

    @GetMapping("/san-pham-doi-tra")
    public List<ThongKeSanPhamDoiTraResponse> getSanPhamDoiTra(){
        return thongKeSanPhamService.getSanPhamDoiTra();
    }
}
