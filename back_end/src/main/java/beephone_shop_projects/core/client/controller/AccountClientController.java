package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.core.client.serives.AccountClientService;
import beephone_shop_projects.core.client.serives.impl.AccountClientServiceImpl;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/account")
@CrossOrigin(origins = "http://localhost:3001")
public class AccountClientController {

    @Autowired
    private AccountClientServiceImpl accountClientService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountLoginRequest accountLoginRequest) {
        try {
            return new ResponseEntity<>(accountClientService.checkEmailAndPass(accountLoginRequest), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
