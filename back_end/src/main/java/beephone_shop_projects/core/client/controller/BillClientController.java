package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.BillClientRequest;
import beephone_shop_projects.core.client.servies.impl.BillClientServiceImpl;
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

    @GetMapping("/get-bill")
    public ResponseEntity<?> getBill(@RequestParam("id_bill") String idBill) {
        try{
            return new ResponseEntity<>(billClientService.getHoaDonByIDHoaDon(idBill), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-bill-detail")
    public ResponseEntity<?> getBillByPhoneAndCode(@RequestParam("phone") String phone, @RequestParam("code") String code) {
        try{
            return new ResponseEntity<>(billClientService.getHoaDonBySoDienThoaiVaMaHoaDon(phone, code), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-order-history")
    public ResponseEntity<?> getHistoryOrder(@RequestParam("id_bill") String idHoaDon) {
        try{
            return new ResponseEntity<>(billClientService.getLichSuHoaDon(idHoaDon), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-order-after-buy")
    public ResponseEntity<?> getHoaDonSauKhiMuaHangByMaHoaDon(@RequestParam("id_bill") String idHoaDon){
        try{
            return new ResponseEntity<>(billClientService.getHoaDonSauKhiMuaHangByMaHoaDon(idHoaDon), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping ("/update-state-bill")
    public ResponseEntity<?> updateStateBill(@RequestParam("id_bill") String idHoaDon){
        try{
            billClientService.updateBillByIdBill(idHoaDon);
            return new ResponseEntity<>("no data", HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping ("/cancel-bill")
    public ResponseEntity<?> cancelBill(@RequestParam("id_bill") String idHoaDon){
        try{
            billClientService.cancelBill(idHoaDon);
            return new ResponseEntity<>("no data", HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
