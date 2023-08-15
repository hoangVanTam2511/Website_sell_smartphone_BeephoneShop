package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.PinServiceImpl;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.Pin;
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
@RequestMapping("/pin")
@CrossOrigin(origins = "http://localhost:3000")
public class PinRestController {

    @Autowired
    private PinServiceImpl pinService;

    @GetMapping("/view-all")
    public Page<Pin> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return pinService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<Pin> getList(){
        return this.pinService.getDanhSachPin();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        pinService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody Pin mauSac) {
        pinService.insert(mauSac);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Pin mauSac,@PathVariable("id")String id) {
        pinService.insert(mauSac);
    }
}
