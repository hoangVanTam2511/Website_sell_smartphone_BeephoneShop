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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = {"*"})
public class KhachHangRestcontroller {
    @Autowired
    private KhachHangServiceImpl accService;
    @Autowired
    private RoleServiceImpl roleService;
    @Autowired
    private ExportServiceImpl excelExportService;
    @Autowired
    private DiaChiServiceImpl diaChiService;

    @GetMapping("hien-thi")
    public Page<AccountResponse> hienThi(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return accService.getAllKH(pageNo);
    }

    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }

    @GetMapping("search-all")
    public Page<AccountResponse> searchAll(@RequestParam("tenKH") String hoVaTen, @RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        Optional<String> opTen = Optional.ofNullable(hoVaTen);
        return accService.search(opTen, pageNo);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody CreateKhachHangRequest request) {
        List<DiaChiKhachHangRequest> diaChiRequestList = request.getDiaChiList();
        List<DiaChi> diaChiList = new ArrayList<>();
        for (DiaChiKhachHangRequest diaChiRequest : diaChiRequestList) {
            DiaChi diaChi = new DiaChi();
            diaChi.setDiaChi(diaChiRequest.getDiaChi());
            diaChi.setTinhThanhPho(diaChiRequest.getTinhThanhPho());
            diaChi.setQuanHuyen(diaChiRequest.getQuanHuyen());
            diaChi.setXaPhuong(diaChiRequest.getXaPhuong());
            diaChi.setHoTenKH(diaChiRequest.getHoTenKH());
            diaChi.setSoDienThoai(diaChiRequest.getSoDienThoai());
            diaChi.setAccount(accService.findAccount(request.getMa()));
           diaChiList.add(diaChi);
        }
        return new ResponseEntity(accService.addKH(request,diaChiList), HttpStatus.CREATED);
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
    @GetMapping("dia-chi/hien-thi")
    public List<DiaChi> hienThiDiaChi() {
        return diaChiService.getAllDiaChi();
    }

    @PostMapping("dia-chi/add?id=")
    public ResponseEntity addDiaChi(@RequestBody DiaChiKhachHangRequest request,@RequestParam String id) {
        try {
            DiaChi addedDiaChi = diaChiService.addDiaChi(request, UUID.fromString(id));
            return ResponseEntity.ok(addedDiaChi);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }
}