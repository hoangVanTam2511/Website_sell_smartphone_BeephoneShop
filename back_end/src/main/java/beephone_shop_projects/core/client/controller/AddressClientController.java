package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.AddressRequest;
import beephone_shop_projects.core.client.servies.impl.AddressClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/add-new-address")
    public ResponseEntity<?> addNewAddress(@RequestBody AddressRequest addressRequest){
        try{
            addressClientService.addNewAddress(addressRequest);
            return new ResponseEntity<>("Thành công", HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-address")
    public ResponseEntity<?> addNewAddress(@RequestParam("id")String id){
        try{
            addressClientService.deleteAddress(id);
            return new ResponseEntity<>("Thành công", HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
