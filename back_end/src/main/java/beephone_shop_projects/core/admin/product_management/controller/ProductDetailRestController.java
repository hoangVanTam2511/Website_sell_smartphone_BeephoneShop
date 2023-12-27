package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductDetailRequest;
import beephone_shop_projects.core.admin.product_management.service.impl.ProductDetailServiceImpl;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chi-tiet-san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailServiceImpl sanPhamChiTietService;

    @PostMapping("/save")
    public SanPhamChiTiet createProductDetail(@RequestBody CreateProductDetailRequest req){
       return sanPhamChiTietService.insert(req);
    }
    @GetMapping("/{idSanPham}")
    public ResponseEntity<?> getListProductDetailByID(@PathVariable("idSanPham") String idSanPham){
        return ResponseEntity.ok(sanPhamChiTietService.getListProductDetailByID(idSanPham));
    }

}
