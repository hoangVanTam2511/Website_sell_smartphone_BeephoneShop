package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchProductDetailRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.ProductServiceImpl1;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class ProductRestControler {
    
    @Autowired
    private ProductServiceImpl1 sanPhamService;

    @GetMapping("/view-all")
    public Page<SanPhamResponce> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return sanPhamService.getAllByDelected(pageable);
    }

    @DeleteMapping("/doi-trang-thai/{id}")
    public void delete(@PathVariable("id")String id) {
        sanPhamService.delete(id);
    }

    @PostMapping("/save")
    public SanPham save(@RequestBody CreateProductRequest productRequest) {
       return sanPhamService.insert(productRequest);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody SanPham sanPham, @PathVariable("id")String id) {

    }

    @PostMapping("/products")
    public Page<SanPhamResponce> search(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                               @RequestBody(required = false) SearchProductDetailRequest chiTietSanPhamRequest) {
        Pageable pageable = PageRequest.of(page-1,5);
        return sanPhamService.searchByAllPosition(chiTietSanPhamRequest,pageable);
    }

    @GetMapping("/don-gia-lon-nhat")
    public Double getDonGiaLonNhat(){
        return  this.sanPhamService.getPriceMax();
    }

    @GetMapping("/get-one/{id}")
    public SanPham getSanPham(
            @PathVariable("id") String id
    ){
        return this.sanPhamService.getOne(id);
    }
    
    @GetMapping("/colors/{id}")
    public ResponseEntity<?> getListColorsByIdProduct(@PathVariable("id")String id){
        if(sanPhamService.getListColorByIDProduct(id) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(sanPhamService.getListColorByIDProduct(id),HttpStatus.OK);
        }
    }

    @GetMapping("/configs/{id}")
    public ResponseEntity<?> getListCofigsByIdProduct(@PathVariable("id")String id){
        if(sanPhamService.getListConfigByIDProduct(id) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(sanPhamService.getListConfigByIDProduct(id),HttpStatus.OK);
        }
    }

    @GetMapping("/configs")
    public ResponseEntity<?> getListCofigsByIdProduct(@RequestParam("idProduct")String id,
                                                      @RequestParam("ram")Integer ram,
                                                      @RequestParam("rom")Integer rom,
                                                      @RequestParam("color")String color
                                                      ){
        if(sanPhamService.getListConfigByIDProduct(id,ram,rom,color) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(sanPhamService.getListConfigByIDProduct(id,ram,rom,color),HttpStatus.OK);
        }
    }

    @GetMapping("/pos_products")
    public ResponseEntity<?> getPosProduct(){
        if(sanPhamService.getListProducts() == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(sanPhamService.getListProducts(),HttpStatus.OK);
        }
    }


}
