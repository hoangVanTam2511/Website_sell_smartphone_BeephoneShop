package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.AddKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;

import beephone_shop_projects.core.admin.account_management.service.impl.DiaChiServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.KhachHangServiceImpl;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = "*")
public class KhachHangRestcontroller {
    @Autowired
    private KhachHangServiceImpl accService;
    @Autowired
    private DiaChiServiceImpl diaChiService;


    @GetMapping("hien-thi-custom")
    public ResponsePage hienThiCustom(@ModelAttribute FindAccountRequest request) {
        return new ResponsePage(accService.getAll(request));
    }
    @GetMapping("hien-thi")
    public ResponsePage hienThi(final FindAccountRequest request) {
        return new ResponsePage(accService.getAllKH(request));
    }

    @GetMapping("search-all")
    public ResponsePage<AccountResponse> searchAll(@RequestParam("tenKH") String hoVaTen, @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return new ResponsePage(accService.search(opTen, pageNo));
    }


    @PostMapping("add")
    public ResponseObject<Account> add(@RequestBody AddKhachHangRequest request) {
        return new ResponseObject(accService.addKH(request));
    }

    @PutMapping("update/{id}")
    public ResponseObject<Account> update(@RequestBody CreateKhachHangRequest request, @PathVariable("id") String id) {
        return new ResponseObject(accService.updateKH(request, id));
    }

    @PutMapping("{id}/doi-tt")
    public void doiTTKH(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

    @PutMapping("dia-chi/thiet-lap-md/{id}")
    @CrossOrigin(origins = {"*"})
    public void thietLapMacDinh(@PathVariable("id") String id, @RequestParam String account) {
        diaChiService.doiTrangThai(id, account);
    }

    @GetMapping("dia-chi/hien-thi/{id}")
    public List<DiaChi> hienThiDiaChi(@PathVariable String id) {
        return diaChiService.getAllDiaChi(id);
    }

    @PostMapping("dia-chi/add")
    @CrossOrigin(origins = {"*"})
    public ResponseEntity addDiaChi(@Valid @RequestBody DiaChiKhachHangRequest request, BindingResult result, @RequestParam String id) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            DiaChi addedDiaChi = diaChiService.addDiaChi(request, id);
            return new ResponseEntity(addedDiaChi, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }

    @PutMapping("dia-chi/update/{id}")
    public ResponseEntity updateDiaChi(@RequestBody DiaChiKhachHangRequest request, @PathVariable("id") String id) {
        try {
            DiaChi addedDiaChi = diaChiService.updateDiaChi(request, id);
            return new ResponseEntity(addedDiaChi, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }

    @DeleteMapping("dia-chi/delete")
    @CrossOrigin(origins = {"*"})
    public ResponseEntity<Object> deleteDC(@RequestParam String id) {
        try {
            diaChiService.xoaDiaChi(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi xóa địa chỉ.");
        }
    }

    @GetMapping("dia-chi/get-one/{id}")
    public DiaChi getOneDiaChi(@PathVariable("id") String id, @RequestParam String account) {
        return diaChiService.getOneDiaChi(id, account);
    }

    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }

}