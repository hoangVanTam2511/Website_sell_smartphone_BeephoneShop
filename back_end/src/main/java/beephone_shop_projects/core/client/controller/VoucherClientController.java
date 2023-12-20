package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.VoucherClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/voucher")
@CrossOrigin(origins = "http://localhost:3001")
public class VoucherClientController {

    @Autowired
    private VoucherClientServiceImpl voucherClientService;

    @GetMapping("/check-voucher")
    public ResponseEntity<?> checkVoucher(@RequestParam("code")String code) {
        try{
            return ResponseEntity.ok(voucherClientService.checkVoucher(code));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
