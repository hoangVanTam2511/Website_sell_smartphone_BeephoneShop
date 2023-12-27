package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.BrandClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/brand")
@CrossOrigin(origins = "http://localhost:3001")
public class BrandClientController {

    @Autowired
    private BrandClientServiceImpl brandClientService;

    @RequestMapping("/get-list-brands")
    public ResponseEntity<?> getListBrands() {
        return new ResponseEntity<>(brandClientService.getListBrands(), null, 200);
    }
}
