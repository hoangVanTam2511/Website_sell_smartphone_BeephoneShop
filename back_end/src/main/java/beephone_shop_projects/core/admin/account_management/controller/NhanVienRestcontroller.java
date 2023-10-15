package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;

import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
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
    public ResponsePage<AccountResponse> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return new ResponsePage(accService.getAllNV(pageNo));
    }

    @PostMapping("add")
    public ResponseObject<AccountResponse> add( @RequestBody CreateAccountRequest request) {
        return new ResponseObject(accService.addNV(request));
    }

    @PutMapping("update/{id}")
    public ResponseObject<AccountResponse> updateNV(@Valid @RequestBody CreateAccountRequest request, BindingResult result,
                                   @PathVariable("id") String id) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return null;
        }
        return new ResponseObject(accService.updateNV(request, id));
    }

    @PutMapping("{id}/doi-tt")
    public void doiTTNV(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

    @GetMapping("search-all")
    public Page<Account> searchAll(@RequestParam("tenKH") String hoVaTen,
                                   @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
//        accService.searchAllKH(hoVaTen, PageRequest.of(pageNo, pageSize))
        return accService.search(opTen, pageNo);
    }
    @GetMapping("/filter")
    public Page<Account> filterStatus(@RequestParam("trangThai") Integer trangThai,
                                      @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.filterTrangThai(trangThai, pageNo);
    }
    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }
}
