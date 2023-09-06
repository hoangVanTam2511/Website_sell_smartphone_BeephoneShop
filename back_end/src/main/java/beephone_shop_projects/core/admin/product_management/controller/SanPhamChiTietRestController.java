package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.SanPhamChiTietServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/chi-tiet-san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamChiTietRestController {

    @Autowired
    private SanPhamChiTietServiceImpl sanPhamChiTietService;

    @PostMapping("/save")
    public void addSanPhamChiTiet(
            @RequestBody ArrayList<String> listId,@RequestParam("id") String idSanPham
            ){
       sanPhamChiTietService.addSanPhamChiTiet(listId,idSanPham);
    }


}
