package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.MauSacServiceImpl;
import beephone_shop_projects.entity.MauSac;
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
@RequestMapping("/mau-sac")
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacRestController{

    @Autowired
    private MauSacServiceImpl mauSacService;

    @GetMapping("/view-all")
    public Page<MauSac> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,2);
        return mauSacService.getAll(pageable);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
      mauSacService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody MauSac mauSac) {
     mauSacService.insert(mauSac);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody MauSac mauSac,@PathVariable("id")String id) {
        mauSac.setId(id);
        mauSacService.insert(mauSac);
    }

    @GetMapping("/get-one/{id}")
    public MauSac update(@PathVariable("id")String id) {
        return mauSacService.getOne(id);
    }
}
