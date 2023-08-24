package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.NhaSanXuatServiceImpl;
import beephone_shop_projects.entity.NhaSanXuat;
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
@RequestMapping("/nha-san-xuat")
@CrossOrigin(origins = "http://localhost:3000")
public class NhaSanXuatRestController {


    @Autowired
    private NhaSanXuatServiceImpl nhaSanXuatService;
    
    @GetMapping("/view-all")
    public Page<NhaSanXuat> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return nhaSanXuatService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<NhaSanXuat> getList(){
        return this.nhaSanXuatService.getDanhSachNhaSanXuat();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        nhaSanXuatService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody NhaSanXuat mauSac) {
        nhaSanXuatService.insert(mauSac);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody NhaSanXuat mauSac,@PathVariable("id")String id) {
        nhaSanXuatService.insert(mauSac);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.nhaSanXuatService.generateNewCode();
    }
}
