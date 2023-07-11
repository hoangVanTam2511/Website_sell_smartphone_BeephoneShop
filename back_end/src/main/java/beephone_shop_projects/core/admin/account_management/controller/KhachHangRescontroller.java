package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.service.impl.AccountServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.KhachHangServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.RoleServiceImpl;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class KhachHangRescontroller {
    @Autowired
    private KhachHangServiceImpl accService;
    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping("hien-thi")
    public Page<Account> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.getAllKH(pageNo);
    }

//    @GetMapping("search-all")
//    public Page<Account> searchAll(@RequestBody CreateAccountRequest request,
//                                     @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
//        Optional<String> opTen = Optional.ofNullable(request.getHoVaTen());
//        return accService.(opTen, pageNo);
//    }
    @PostMapping("add")
    public ResponseEntity add(@RequestBody CreateAccountRequest request) {
        return new ResponseEntity(accService.addKH(request), HttpStatus.CREATED) ;
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody Account request,
                            @PathVariable("id") String id) {
        return new ResponseEntity(accService.updateKH(request, id), HttpStatus.OK) ;
    }
    @PutMapping("{id}/doi-tt")
    public void doiTTKH(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

}
