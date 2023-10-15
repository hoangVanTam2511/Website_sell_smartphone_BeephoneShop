package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.repository.ProductRepository;
import beephone_shop_projects.core.admin.product_management.service.impl.ImeiServiceImpl;
import beephone_shop_projects.entity.Imei;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ImeiRestController {

    @Autowired
    private ImeiServiceImpl imeiService;

    @Autowired
    private ProductRepository chiTietProductRepository;

    @GetMapping("/view-all/{id}")
    public Page<Imei> viewAll(@PathVariable("id")String id,
                              @RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return imeiService.getAllByIdChiTietSanPham(id,pageable);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        imeiService.delete(id);
    }

    @PostMapping("/save/{id}")
    public void save(@PathVariable("id")String id,@RequestBody Imei imei) {
        imeiService.insert(imei);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Imei imei ,@PathVariable("id")String id) {
        imeiService.insert(imei);
    }


}
