package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.SanPhamServiceImpl;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.SanPham;
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
@RequestMapping("/san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamRestController {

    @Autowired
    private SanPhamServiceImpl sanPhamService;

    @GetMapping("/view-all")
    public Page<SanPham> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return sanPhamService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<SanPham> getList(){
        return this.sanPhamService.getDanhSachSanPham();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        sanPhamService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody SanPham mauSac) {
        sanPhamService.insert(mauSac);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody SanPham mauSac,@PathVariable("id")String id) {
        sanPhamService.insert(mauSac);
    }
}
