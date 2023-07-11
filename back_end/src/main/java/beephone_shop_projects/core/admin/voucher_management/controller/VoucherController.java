package beephone_shop_projects.core.admin.voucher_management.controller;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/voucher")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/hien-thi")
    public ResponseEntity hienThiVoucher() {
        return new ResponseEntity(voucherService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/get-by-id/{ma}")
    public ResponseEntity getOneVoucher(@PathVariable("ma") String ma) {
        return new ResponseEntity(voucherService.getOne(ma), HttpStatus.OK);
    }

    @PostMapping("/addVoucher")
    public ResponseEntity addVoucher(@RequestBody CreateVoucherRequest request) {
        return new ResponseEntity(voucherService.addVoucher(request), HttpStatus.CREATED);
    }

    @PutMapping("/updateVoucher/{id}")
    public ResponseEntity updateVoucher(@RequestBody UpdateVoucherRequest request, @PathVariable("id") String id) {
        return new ResponseEntity(voucherService.updateVoucher(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteVoucher/{id}")
    public ResponseEntity deleteVoucher(@PathVariable("id") String id) {
        return new ResponseEntity(voucherService.deleteVoucher(id), HttpStatus.OK);
    }
}
