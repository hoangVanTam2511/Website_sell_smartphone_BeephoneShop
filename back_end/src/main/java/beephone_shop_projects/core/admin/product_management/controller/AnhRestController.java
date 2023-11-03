package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateImageRequest;
import beephone_shop_projects.core.admin.product_management.service.impl.ImageServiceImpl1;
import beephone_shop_projects.entity.Anh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/anh")
@CrossOrigin(origins = "http://localhost:3000")
public class AnhRestController {

    @Autowired
    private ImageServiceImpl1 anhService;

    @PostMapping("/save")
    public Anh save(@RequestBody CreateImageRequest req) {
        return anhService.insert(req);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable("id") String id) {
       return  new ResponseEntity<>(anhService.findByIDChiTietSanPham(id), HttpStatus.OK);
    }
    

}
