package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.HinhThucSanPhamServiceImpl;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.HinhThucSanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/hinh-thuc-san-pham")
@CrossOrigin
public class HinhThucSanPhamRestController {

    @Autowired
    private HinhThucSanPhamServiceImpl hinhThucSanPhamService;

    @GetMapping("/view-all")
    public Page<HinhThucSanPham> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return hinhThucSanPhamService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<HinhThucSanPham> getList(){
        return this.hinhThucSanPhamService.getDanhSachHinhThucSanPham();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        hinhThucSanPhamService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody HinhThucSanPham anh) {
        hinhThucSanPhamService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody HinhThucSanPham anh ,@PathVariable("id")String id) {
        hinhThucSanPhamService.insert(anh);
    }

}
