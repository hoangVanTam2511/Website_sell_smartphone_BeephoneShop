package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.AddNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.DiaChiNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;

import beephone_shop_projects.core.admin.account_management.service.impl.DiaChiServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/nhan-vien/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class NhanVienRestcontroller {
    @Autowired
    private NhanVienService accService;

    @Autowired
    private DiaChiServiceImpl diaChiService;

    @GetMapping("hien-thi")
    public ResponsePage<Account> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return new ResponsePage(accService.getAllNV(pageNo));
    }

    @GetMapping("/all/no-page")
    public ResponseObject<List<Account>> hienThiAllNhanVien() {
        return new ResponseObject<>(accService.getAllNVienNoPage());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody AddNhanVienRequest request, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        if (accService.isPhoneNumberUnique(request.getSoDienThoai())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại trong hệ thống.");
        }
        if(accService.existsByCanCuocCongDan(request.getCanCuocCongDan())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số căn cước đã được đăng ký trong hệ thống.");
        }
        try {
            Account addedAccount = accService.addNV(request);
   return ResponseEntity.status(HttpStatus.CREATED).body(addedAccount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("update/{id}")
    public ResponseObject<Account> updateNV(@Valid @RequestBody CreateNhanVienRequest request, BindingResult result,
                                            @PathVariable("id") String id) {
        return new ResponseObject(accService.updateNV(request, id));
    }

    @PutMapping("{id}/doi-tt")
    public void doiTTNV(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

    @GetMapping("search-all")
    public ResponsePage<Account> searchAll(@RequestParam("tenKH") String hoVaTen,
                                           @RequestParam(name = "page", defaultValue = "0") Integer pageNo,
                                           @RequestParam("trangThai") String trangThai) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return new ResponsePage(accService.search(opTen, Integer.valueOf(trangThai), pageNo));
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

    @PostMapping("dia-chi/add")
    @CrossOrigin(origins = {"*"})
    public ResponseEntity addDiaChi(@Valid @RequestBody DiaChiNhanVienRequest request, BindingResult result, @RequestParam String id) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            DiaChi addedDiaChi = diaChiService.addDiaChiNhanVien(request, id);
            return new ResponseEntity(addedDiaChi, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }

    @PutMapping("dia-chi/update")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public ResponseEntity updateDiaChi(@RequestBody DiaChiNhanVienRequest request, @RequestParam("id") String id) {
        try {
            DiaChi addedDiaChi = diaChiService.updateDiaChiNhanVien(request, id);
            return new ResponseEntity(addedDiaChi, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }
}
