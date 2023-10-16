package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.service.impl.DiaChiServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.ExportServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.KhachHangServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.RoleServiceImpl;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = {"*"})
public class KhachHangRestcontroller {
    @Autowired
    private KhachHangServiceImpl accService;
    @Autowired
    private ExportServiceImpl excelExportService;
    @Autowired
    private DiaChiServiceImpl diaChiService;

    @GetMapping("hien-thi")
    public ResponseEntity hienThi(@RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        return new ResponseEntity(accService.getAllKH(pageNo), HttpStatus.OK);
    }

    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }

    @GetMapping("search-all")
    public ResponseEntity searchAll(@RequestParam("tenKH") String hoVaTen, @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return new ResponseEntity(accService.search(opTen,pageNo), HttpStatus.OK);
    }


    @PostMapping("add")
    public ResponseEntity add(@RequestBody CreateKhachHangRequest request) {
        return new ResponseEntity(accService.addKH(request), HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody CreateKhachHangRequest request, @PathVariable("id") String id) {
        return new ResponseEntity(accService.updateKH(request, id), HttpStatus.OK);
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

    @GetMapping(value = "/export", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> exportExcel(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) throws IOException {
        byte[] excelBytes = excelExportService.exportExcelData(pageNo);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "Thông tin khách hàng.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);

    }

    @PostMapping("import")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            accService.importExcelData(file.getInputStream());
            return ResponseEntity.ok("Data imported successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import data.");
        }
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

}