//package beephone_shop_projects.core.admin.account_management.controller;
//
//import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
//import beephone_shop_projects.core.admin.account_management.service.KhachHangCustomService;
//import beephone_shop_projects.core.common.base.ResponsePage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/nhap/")
//@CrossOrigin(origins = "*")
//public class NhapController {
//    @Autowired
//    private KhachHangCustomService khachHangCustomService;
//    @GetMapping("hien-thi")
//    public ResponsePage hienThi(@ModelAttribute FindAccountRequest request) {
//        return new ResponsePage( khachHangCustomService.findAllKH(request));
//    }
//}
