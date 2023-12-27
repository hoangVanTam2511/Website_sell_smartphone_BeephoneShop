package beephone_shop_projects.core.admin.voucher_management.controller;

import beephone_shop_projects.core.admin.voucher_management.model.request.ChangeStatusVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.utils.mail.EmailUtils;
import beephone_shop_projects.utils.mail.MailBeePhoneRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/voucher")
@CrossOrigin("*")
public class VoucherRestController {

  @Autowired
  private VoucherService voucherService;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private EmailUtils emailUtils;

  @PostMapping("/sendMail")
  private void testMail(@RequestBody MailBeePhoneRequest emails) {
    emailUtils.sendEmailEvent(emails);
  }

  @GetMapping("/get-by-id/{id}")
  public ResponseObject getOneVoucher(@PathVariable("id") String id) {
    return new ResponseObject(voucherService.getOne(id));
  }

  @PostMapping("/addVoucher")
  public ResponseObject addVoucher(@RequestBody CreateVoucherRequest request) {
    return new ResponseObject(voucherService.addVoucher(request));
  }

  @PutMapping("/updateVoucher/{id}")
  public ResponseObject updateVoucher(@PathVariable("id") String id, @RequestBody UpdateVoucherRequest request) {
    return new ResponseObject(voucherService.updateVoucher(request, id));
  }

  @DeleteMapping("/deleteVoucher/{id}")
  public ResponseObject deleteVoucher(@PathVariable("id") String id) {
    return new ResponseObject(voucherService.deleteVoucher(id));
  }

  @PutMapping("/deleteTrangThaiVoucher/{id}")
  public ResponseObject deleteTrangThaiVoucher(@PathVariable("id") String id, @RequestBody ChangeStatusVoucherRequest request) {
    return new ResponseObject(voucherService.doiTrangThai(request, id));
  }

  @PutMapping("/kichHoatVoucher/{id}")
  public ResponseObject kichHoatVoucher(@PathVariable("id") String id) {
    return new ResponseObject(voucherService.kichHoatVoucher(id));
  }

  @GetMapping("/vouchers")
  public ResponsePage hienThiVoucher(@ModelAttribute FindVoucherRequest request) {
    return new ResponsePage(voucherService.getAll(request));
  }

  @GetMapping("/findVoucher")
  public ResponseObject getList(@RequestParam(value = "input", defaultValue = "") String input,
                                @RequestParam(value = "tongTien", defaultValue = "0") BigDecimal tongTien) {
    return new ResponseObject(voucherService.checkVoucher(input, tongTien));
  }

  @GetMapping("/voucherActive")
  public ResponsePage getVoucherActive(final FindVoucherRequest request) {
    return new ResponsePage(voucherService.getVoucherStatusIsActive(request.getPageNo(), request));
  }

  @GetMapping("/voucherActive/all")
  public ResponseObject getVoucherActiveList() {
    return new ResponseObject(voucherRepository.getVoucherStatusIsActiveList());
  }

}
