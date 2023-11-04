package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.core.client.serives.AccountClientService;
import beephone_shop_projects.core.client.serives.impl.AccountClientServiceImpl;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/account")
public class AccountClientController {

    @Autowired
    private AccountClientServiceImpl accountClientService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountLoginRequest accountLoginRequest) {
        return new ResponseEntity<>(accountClientService.checkEmailAndPass(accountLoginRequest), HttpStatus.OK);
    }

}
