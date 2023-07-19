package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.service.impl.ExportServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.KhachHangServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.RoleServiceImpl;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class KhachHangRescontroller {
    @Autowired
    private KhachHangServiceImpl accService;
    @Autowired
    private RoleServiceImpl roleService;
    @Autowired
    private ExportServiceImpl excelExportService;

    @GetMapping("hien-thi")
    public Page<Account> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.getAllKH(pageNo);
    }

    @GetMapping("hien-thi-custom")
    public Page<AccountResponse> hienThiCus(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.searchAllKHang(pageNo);
    }

    @GetMapping("search-all")
    public Page<Account> searchAll(@RequestParam("tenKH") String hoVaTen, @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return accService.search(opTen, pageNo);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody CreateAccountRequest request) {
        return new ResponseEntity(accService.addKH(request), HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody Account request, @PathVariable("id") String id) {
        return new ResponseEntity(accService.updateKH(request, id), HttpStatus.OK);
    }

    @PutMapping("{id}/doi-tt")
    public void doiTTKH(@PathVariable("id") String id) {
        accService.doiTrangThai(id);
    }

    @GetMapping(value = "/export", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> exportExcel(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) throws IOException {
        byte[] excelBytes = excelExportService.exportExcelData(pageNo);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "Thông tin khách hàng.xlsx");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);

    }

    @PostMapping("/import")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        // Xử lý file Excel và thực hiện các thao tác cần thiết
        // Ví dụ: đọc dữ liệu từ file, lưu vào cơ sở dữ liệu, xử lý dữ liệu, v.v.

        // Trả về phản hồi thành công
        return ResponseEntity.ok("Import successful");
    }
}