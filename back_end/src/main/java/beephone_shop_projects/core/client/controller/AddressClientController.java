package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.serives.impl.AddressClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/address")
@CrossOrigin(origins = "http://localhost:3001")
public class AddressClientController {

    @Autowired
    private AddressClientServiceImpl addressClientService;

    @GetMapping("/get-all-address")
    public ResponseEntity<?> getAllAddress(@RequestParam("id_account") String idAccount){
        return new ResponseEntity<>(addressClientService.findAddressById(idAccount), null, 200);
    }

}
