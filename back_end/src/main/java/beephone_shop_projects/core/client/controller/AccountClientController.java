package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.AccountChangeInformationRequest;
import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.core.client.models.request.AccountRegisterRequest;
import beephone_shop_projects.core.client.models.response.AccountDto;
import beephone_shop_projects.infrastructure.jwt.UserAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import beephone_shop_projects.core.client.servies.impl.AccountClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/client/account")
public class AccountClientController {

    @Autowired
    private AccountClientServiceImpl accountClientService;

    private final UserAuthenticationProvider userAuthenticationProvider;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountLoginRequest accountLoginRequest) {
        try {
            AccountDto account = accountClientService.checkEmailAndPass(accountLoginRequest);
            account.setToken(userAuthenticationProvider.createToken(account.getEmail()));
            return new ResponseEntity<>(account, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-account")
    public ResponseEntity<?> getAccountByIDAccount(@RequestParam("id_account") String idAccount){
        try{
            return new ResponseEntity<>(accountClientService.getAccountByIDAccount(idAccount), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/create-account-anonymous")
    public ResponseEntity<?> createAccountAnonymous(){
        try{
            return new ResponseEntity<>(accountClientService.createAccountAnonymous(), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AccountRegisterRequest accountRegisterRequest){
      try
      {
          AccountDto account = accountClientService.register(accountRegisterRequest);
          account.setToken(userAuthenticationProvider.createToken(account.getEmail()));
          return new ResponseEntity<>(account, HttpStatus.OK);
      }
      catch (Exception ex)
      {
          return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
      }
    }

    @PutMapping("/change-infor")
    public ResponseEntity<?> updateAccount(@RequestBody AccountChangeInformationRequest account){
        try{
            return new ResponseEntity<>(accountClientService.changeInformationUser(account), HttpStatus.OK);
        }catch (Exception ex){
            // không tìm thay tai khoan thi se ban ra exception
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/change-pass")
    public ResponseEntity<?> changePass(@RequestParam("pass")String pass, @RequestParam("id")String id){
        try{
            return new ResponseEntity<>(accountClientService.changePass(pass, id), HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
