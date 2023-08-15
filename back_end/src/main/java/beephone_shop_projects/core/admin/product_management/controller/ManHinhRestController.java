package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.ManHinhServiceImpl;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.ManHinh;
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
@RequestMapping("/man-hinh")
@CrossOrigin(origins = "http://localhost:3000")
public class ManHinhRestController {

    @Autowired
    private ManHinhServiceImpl manHinhService;

    @GetMapping("/view-all")
    public Page<ManHinh> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return manHinhService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<ManHinh> getList(){
        return this.manHinhService.getDanhSachManHinh();
    }
    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        manHinhService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody ManHinh anh) {
        manHinhService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody ManHinh anh ,@PathVariable("id")String id) {
        manHinhService.insert(anh);
    }
}
