package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;
import beephone_shop_projects.core.admin.account_management.service.impl.ExportServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.RoleServiceImpl;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/nhan-vien/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class NhanVienRestcontroller {
    @Autowired
    private NhanVienService accService;
    @Autowired
    private ExportServiceImpl excelExportService;

    @GetMapping("hien-thi")
    public ResponseEntity hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(accService.getAllNV(pageNo), HttpStatus.OK);
    }
    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }
    @PostMapping("add")
    public ResponseEntity add(@RequestBody CreateAccountRequest request) {
        return new ResponseEntity(accService.addNV(request), HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity updateNV(@RequestBody CreateAccountRequest request,
                                   @PathVariable("id") String id) {
        return new ResponseEntity(accService.updateNV(request, id), HttpStatus.OK);
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

}
