package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietCauHinhResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietSanPhamResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.ChiTietSanPhamServiceImpl;
import beephone_shop_projects.entity.ChiTietSanPham;
import beephone_shop_projects.entity.Imei;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/chi-tiet-san-pham")
@CrossOrigin
public class ChiTietSanPhamRestControler {
    
    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @GetMapping("/products")
    public Page<ChiTietSanPhamResponce> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return chiTietSanPhamService.getAllByDelected(pageable);
    }

    @DeleteMapping("/doi-trang-thai/{id}")
    public void delete(@PathVariable("id")String id) {
        chiTietSanPhamService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateChiTietSanPhamRequest chiTietSanPhamRequest) {
        chiTietSanPhamService.insert(chiTietSanPhamRequest);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody ChiTietSanPham chiTietSanPham ,@PathVariable("id")String id) {

    }


    @PostMapping("/view-all")
    public Page<ChiTietSanPhamResponce> search(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                               @RequestBody(required = false) SearchChiTietSanPhamRequest chiTietSanPhamRequest) {
        Pageable pageable = PageRequest.of(page,5);
        System.out.println(chiTietSanPhamRequest);
        return chiTietSanPhamService.searchByAllPosition(chiTietSanPhamRequest,pageable);
    }

    @GetMapping("/get-cau-hinh")
    public Page<ChiTietCauHinhResponce> getChiTietCauHinh(@RequestParam(value = "page",defaultValue = "1") Integer page){
        Pageable pageable = PageRequest.of(page,5);
        return chiTietSanPhamService.getChiTietCauHinh(pageable);
    }

}
