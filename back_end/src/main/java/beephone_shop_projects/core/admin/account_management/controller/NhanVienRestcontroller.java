package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.SearchAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;

import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/nhan-vien/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class NhanVienRestcontroller {
    @Autowired
    private NhanVienService accService;
    @GetMapping("hien-thi")
    public ResponsePage<Account> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return new ResponsePage(accService.getAllNV(pageNo));
    }
    @PostMapping("add")
    public ResponseObject<Account> add( @RequestBody CreateAccountRequest request) {
        return new ResponseObject(accService.addNV(request));
    }

    @PutMapping("update/{id}")
    public ResponseObject<Account> updateNV(@Valid @RequestBody CreateAccountRequest request, BindingResult result,
                                   @PathVariable("id") String id) {
        return new ResponseObject(accService.updateNV(request, id));
    }

    @PutMapping("{id}/doi-tt")
    public void doiTTNV(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

    @GetMapping("search-all")
    public ResponsePage<Account> searchAll(@RequestParam("tenKH") String hoVaTen,
                                   @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return new ResponsePage(accService.search(opTen, pageNo)) ;
    }
//    @GetMapping("search-all")
//    public ResponsePage<Account> hienThi(@ModelAttribute SearchAccountRequest request) {
//        return new ResponsePage(accService.getAll(request));
//    }
    @GetMapping("/filter")
    public Page<Account> filterStatus(@RequestParam("trangThai") StatusAccountCus trangThai,
                                      @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.filterTrangThai(trangThai, pageNo);
    }
    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }
}
