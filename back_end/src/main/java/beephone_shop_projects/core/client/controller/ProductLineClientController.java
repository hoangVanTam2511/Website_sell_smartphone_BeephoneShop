package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.ProductLineServiceClientImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/product-line")
@CrossOrigin(origins = "http://localhost:3001")
public class ProductLineClientController {

    @Autowired
    private ProductLineServiceClientImpl productLineServiceImpl;

    @GetMapping("/get-list-product-lines")
    public ResponseEntity<?> getListProductLines() {
        return new ResponseEntity<>(productLineServiceImpl.getListProductLines(), null, 200);
    }
}
