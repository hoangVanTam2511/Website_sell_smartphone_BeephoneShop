package beephone_shop_projects.core.client.controller;

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

}
