package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeSanPhamKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/thong-ke")
@CrossOrigin("*")
public class ThongKeDonHangController {

    @Autowired
    private ThongKeDonHangService thongKeDonHangService;

    // Hàm này lấy ra tổng doanh thu và tổng số đơn hàng
    @GetMapping("/don-hang-all")
    private ThongKeDonHangResponse getDonHangAll(){
        return thongKeDonHangService.getDonHangAll();
    }


    // Hàm lấy ra số đơn hàng và tổng doanh thu theo tháng và năm
    @GetMapping("/don-hang-year")
    private ThongKeDonHangResponse getDonHangTheoNamThang(@ModelAttribute FindByMonthAndYearRequest request){
        return thongKeDonHangService.getDonHangAllTheoNam(request);
    }

    // Hàm này lấy ra số lượng đơn hàng và tổng doanh thu trong ngày hiện tại
    @GetMapping("/in-day")
    private ThongKeDonHangResponse getDonHangInDay(){
        return thongKeDonHangService.getDonHangInDay();
    }

    // Hàm này lấy ra số lượng đơn hàng và tổng doanh thu trong tháng hiện tại
    @GetMapping("/in-month")
    private ThongKeDonHangResponse getDonHangInMonth(){
        return thongKeDonHangService.getDonHangInMonth();
    }

    // Hàm này lấy ra số lượng đơn hàng bán được trong từng ngày
    @GetMapping("/don-hang-khoang-ngay")
    private List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(@RequestParam(name = "date1") Date date1, @RequestParam(name = "date2") Date date2 ){
        return thongKeDonHangService.getDonHangKhoangNgay(date1, date2);
    }

}
