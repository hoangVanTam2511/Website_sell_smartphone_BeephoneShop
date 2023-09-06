package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.SanPhamServiceImpl;
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

@RestController
@RequestMapping("/san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamRestControler {
    
    @Autowired
    private SanPhamServiceImpl chiTietSanPhamService;

    @GetMapping("/view-all")
    public Page<SanPhamResponce> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return chiTietSanPhamService.getAllByDelected(pageable);
    }

    @DeleteMapping("/doi-trang-thai/{id}")
    public void delete(@PathVariable("id")String id) {
        chiTietSanPhamService.delete(id);
    }

    @PostMapping("/save")
    public SanPham save(@RequestBody CreateChiTietSanPhamRequest chiTietSanPhamRequest) {
       return chiTietSanPhamService.insert(chiTietSanPhamRequest);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody SanPham sanPham, @PathVariable("id")String id) {

    }


    @PostMapping("/products")
    public Page<SanPhamResponce> search(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                               @RequestBody(required = false) SearchChiTietSanPhamRequest chiTietSanPhamRequest) {
        Pageable pageable = PageRequest.of(page,5);
        System.out.println(chiTietSanPhamRequest);
        return chiTietSanPhamService.searchByAllPosition(chiTietSanPhamRequest,pageable);
    }


    @GetMapping("/don-gia-lon-nhat")
    public Double getDonGiaLonNhat(){
        return  this.chiTietSanPhamService.getPriceMax();
    }

    @GetMapping("/get-one/{id}")
    public SanPham getSanPham(
            @PathVariable("id") String id
    ){
        return this.chiTietSanPhamService.getOne(id);
    }

}
