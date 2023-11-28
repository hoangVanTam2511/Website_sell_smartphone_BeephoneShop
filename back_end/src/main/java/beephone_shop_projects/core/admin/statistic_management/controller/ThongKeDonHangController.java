package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangKhoangNgay;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeTrangThaiDonHang;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/thong-ke")
@CrossOrigin("*")
public class ThongKeDonHangController {

    @Autowired
    private ThongKeDonHangService thongKeDonHangService;

    // Hàm này lấy ra tổng doanh thu và tổng số đơn hàng
    @GetMapping("/don-hang-all")
    public ThongKeDonHangResponse getDonHangAll(){
        return thongKeDonHangService.getDonHangAll();
    }


    // Hàm lấy ra số đơn hàng và tổng doanh thu theo tháng và năm
    @GetMapping("/don-hang-year")
    public ThongKeDonHangResponse getDonHangTheoNamThang(@ModelAttribute FindByMonthAndYearRequest request){
        return thongKeDonHangService.getDonHangAllTheoNam(request);
    }

    // Hàm này lấy ra số lượng đơn hàng và tổng doanh thu trong ngày hiện tại
    @GetMapping("/in-day")
    public ThongKeDonHangResponse getDonHangInDay(){
        return thongKeDonHangService.getDonHangInDay();
    }

    // Hàm này lấy ra số lượng đơn hàng và tổng doanh thu trong tháng hiện tại
    @GetMapping("/in-month")
    public ThongKeDonHangResponse getDonHangInMonth(){
        return thongKeDonHangService.getDonHangInMonth();
    }

    // Hàm này lấy ra số lượng đơn hàng bán được trong từng ngày
    @GetMapping("/don-hang-khoang-ngay")
    public List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(final ThongKeKhoangNgayDonHangRequest request){
        return thongKeDonHangService.getDonHangKhoangNgay(request);
    }

    // Hàm này lấy ra số lượng và phần trăm theo từng trạng thái đơn hàng
    @GetMapping("/trang-thai-don-hang")
    public List<ThongKeTrangThaiDonHang> getAllTrangThaiDonHang(){
        return thongKeDonHangService.getAllTrangThaiDonHang();
    }

}
