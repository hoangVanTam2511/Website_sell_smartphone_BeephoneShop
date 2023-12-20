package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.BillDetailClientRequest;
import beephone_shop_projects.core.client.servies.impl.BillClientServiceImpl;
import beephone_shop_projects.core.client.servies.impl.BillDetailClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/bill-detail")
@CrossOrigin(origins = "http://localhost:3001")
public class BillDetailClientController {

    @Autowired
    private BillClientServiceImpl billClientService;

    @Autowired
    private BillDetailClientServiceImpl billDetailClientService;

    @PostMapping("/create-bill-detail")
    public ResponseEntity<?> createBill(@RequestBody BillDetailClientRequest billClientRequest)  {
        try{
            return new ResponseEntity<>(billClientService.createBillDetail(billClientRequest), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-product-details")
    public ResponseEntity<?> getProductDetail(@RequestParam("id_bill") String idBill){
        try{
            return new ResponseEntity<>(billDetailClientService.getListProductOfDetailByIDBill(idBill), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/send-email-bill")
    public ResponseEntity<?> sendEmail(@RequestParam("id_bill") String idBill){
        try{
            return new ResponseEntity<>(billClientService.sendEmail(idBill), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
