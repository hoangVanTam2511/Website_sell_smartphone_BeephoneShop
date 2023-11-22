package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.BillClientRequest;
import beephone_shop_projects.core.client.serives.impl.BillClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/bill")
@CrossOrigin(origins = "http://localhost:3001")
public class BillClientController {

    @Autowired
    private BillClientServiceImpl billClientService;

    @PostMapping("/create-bill")
    public ResponseEntity<?> createBill(@RequestBody BillClientRequest billClientRequest)  {
        try{
            return new ResponseEntity<>(billClientService.createBillClient(billClientRequest), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-list-bills")
    public ResponseEntity<?> getListBill(@RequestParam("id_customer") String idCustomer) {
        try{
            return new ResponseEntity<>(billClientService.getHoaDonByIDKhachHang(idCustomer), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
