package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.SearchProductDetailClient;
import beephone_shop_projects.core.client.serives.impl.ProductDetailClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/product-detail")
@CrossOrigin(origins = "http://localhost:3001")
public class ProductDetailClientRestController {

    @Autowired
    private ProductDetailClientService productDetailService;

    @GetMapping("/get-list-products")
    public ResponseEntity<?> getListProductDetails() {
        try {
            return new ResponseEntity<>(productDetailService.getProductDetails(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-products-best-seller")
    public ResponseEntity<?> getListProductBestSeller() {
        try {
            return new ResponseEntity<>(productDetailService.getProductBestSeller(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-config/{id}")
    public ResponseEntity<?> getConfigOfIdProduct(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(productDetailService.getConfig(id), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-product/{id}")
    public ResponseEntity<?> getProductOfIdProduct(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(productDetailService.getProductByIdProduct(id), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-max-price")
    public ResponseEntity<?> getMaxPrice(){
        return new ResponseEntity<>(productDetailService.getMaxProductDetail(), HttpStatus.OK);
    }

    @GetMapping("/get-min-price") 
    public ResponseEntity<?> getMinPrice(){
        return new ResponseEntity<>(productDetailService.getMinProductDetail(), HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                              @RequestBody(required = false) SearchProductDetailClient chiTietSanPhamRequest) {
        Object httpStatus;
        return new ResponseEntity<>(productDetailService.searchByAllPosition(chiTietSanPhamRequest), HttpStatus.OK);
    }

}
