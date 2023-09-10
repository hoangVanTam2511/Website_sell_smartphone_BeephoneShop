package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class KhuyenMaiChiTietController {

    @Autowired
    private KhuyenMaiChiTietService khuyenMaiChiTietService;

    @PostMapping("/khuyen-mai-chi-tiet/add")
    public ResponseEntity addKhuyenMaiChiTiet(@RequestBody CreateKhuyenMaiChiTietRequest request) {
        return new ResponseEntity(khuyenMaiChiTietService.addKhuyenMaiChiTiet(request), HttpStatus.CREATED);
    }

}
