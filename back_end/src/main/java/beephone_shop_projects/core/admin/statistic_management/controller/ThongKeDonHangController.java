package beephone_shop_projects.core.admin.statistic_management.controller;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

//    @GetMapping("/in-month")
//    private ThongKeDonHangResponse getDonHangInMonth(){
//        return thongKeDonHangService.xemThongKeTheoThang();
//    }

    @GetMapping("/don-hang-year")
    private ThongKeDonHangResponse getDonHangTheoNamThang(@ModelAttribute FindByMonthAndYearRequest request){
        return thongKeDonHangService.getDonHangAllTheoNam(request);
    }


}
