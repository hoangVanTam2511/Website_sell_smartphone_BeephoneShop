package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.DanhMucClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/danh-muc")
@CrossOrigin(origins = "http://localhost:3001")
public class DanhMucClientController {

    @Autowired
    private DanhMucClientServiceImpl danhMucClientService;

    @GetMapping("/get-list")
    public ResponseEntity<?> getListDanhMuc(){
        try {
            return new ResponseEntity<>(danhMucClientService.getListDanhMuc(), null, 200);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
