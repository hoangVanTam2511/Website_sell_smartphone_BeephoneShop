package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.ImeiServiceImpl;
import beephone_shop_projects.entity.Imei;
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

@RestController
@RequestMapping("/imei")
@CrossOrigin
public class ImeiRestController {

    @Autowired
    private ImeiServiceImpl imeiService;

    @GetMapping("/view-all")
    public Page<Imei> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return imeiService.getAll(pageable);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        imeiService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody Imei imei) {
        imeiService.insert(imei);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Imei imei ,@PathVariable("id")String id) {
        imeiService.insert(imei);
    }


}
