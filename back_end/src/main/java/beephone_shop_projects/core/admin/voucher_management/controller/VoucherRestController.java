package beephone_shop_projects.core.admin.voucher_management.controller;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/voucher")
@CrossOrigin("*")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/hien-thi")
    public Page<VoucherResponse> hienThiVoucher(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return voucherService.getAll(pageable);
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

    @PutMapping("/deleteTrangThaiVoucher/{id}")
    public ResponseEntity deleteTrangThaiVoucher(@PathVariable("id") String id) {
        return new ResponseEntity(voucherService.doiTrangThai(id), HttpStatus.OK);
    }

    @GetMapping("/searchVoucher")
    public ResponseEntity searchVoucher(@RequestBody FindVoucherRequest request) {
        return new ResponseEntity(voucherService.timKiemVoucher(request), HttpStatus.OK);
    }

}
