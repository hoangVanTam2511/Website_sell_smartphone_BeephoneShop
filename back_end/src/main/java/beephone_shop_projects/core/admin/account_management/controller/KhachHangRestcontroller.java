package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.model.request.*;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.repository.CustomKhachHangRepositoryImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.DiaChiServiceImpl;
import beephone_shop_projects.core.admin.account_management.service.impl.KhachHangServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.utils.ReadFileExcelUtils;
import jakarta.validation.Valid;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/khach-hang/")
@CrossOrigin(origins = "*")
public class KhachHangRestcontroller {

@Autowired
private KhachHangServiceImpl accService;

@Autowired
private DiaChiServiceImpl diaChiService;

@Autowired
private CustomKhachHangRepositoryImpl customKhachHangRepository;

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
    public ResponseEntity<?> add(@Valid @RequestBody AddKhachHangRequest request,BindingResult result) {
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
        try {
            Account addedAccount = accService.addKH(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedAccount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

  @PutMapping("update/{id}")
  public ResponseObject<Account> update(@RequestBody CreateKhachHangRequest request, @PathVariable("id") String id) {
    return new ResponseObject(accService.updateKH(request, id));
  }
    @PostMapping("/add-with-excel")
    public ResponseObject<Account> add(@RequestBody AddKhachHangExcelRequest request) {
        return new ResponseObject(accService.addKHByImportExcel(request));
    }

  @PutMapping("{id}/doi-tt")
  public void doiTTKH(@PathVariable("id") String id) {
    accService.doiTrangThai(id);
  }

    @PutMapping("dia-chi/thiet-lap-md")
    @CrossOrigin(origins = {"*"})
    public void thietLapMacDinh( @RequestParam String id, @RequestParam String account) {
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

    @PutMapping("dia-chi/update")
    public ResponseEntity updateDiaChi(@RequestBody DiaChiKhachHangRequest request, @RequestParam String id) {
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

//    @GetMapping("dia-chi/get-one")
//    public DiaChi getOneDiaChi(@RequestParam("id") String id) {
//        return diaChiService.getOneDiaChi(id);
//    }

    @GetMapping("hien-thi-theo/{id}")
    public Account getOne(@PathVariable("id") UUID id) {
        return accService.getOne(id);
    }
    @GetMapping("mot-dia-chi")
    @CrossOrigin(origins = {"*"})
    public DiaChi getOneDiaChi(@RequestParam String id) {
        return diaChiService.searchDiaChi(id);
    }
    @PutMapping("dia-chi/update1")
    public ResponseEntity updateDiaChi1(@RequestBody DiaChiKhachHangRequest request, @RequestParam String id) {
        try {
            DiaChi addedDiaChi = diaChiService.updateDiaChiBy(request, id);
            return new ResponseEntity(addedDiaChi, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server khi thêm địa chỉ.");
        }
    }

  @GetMapping("/{id}")
  public Account getById(@PathVariable("id") String id) {
    return customKhachHangRepository.getAccountById(id);
  }

    @PostMapping("/get-excel-template")
    public ResponseEntity<byte[]> createExcelTemplate() throws IOException {
        String templateFilePath = "static/assets/excel-template/import-customer.xlsx";
        Workbook templateWorkbook = new ReadFileExcelUtils().readExcelTemplate(templateFilePath);
        Workbook newWorkbook = new XSSFWorkbook();

        for (int i = 0; i < templateWorkbook.getNumberOfSheets(); i++) {
            Sheet templateSheet = templateWorkbook.getSheetAt(i);
            Sheet newSheet = newWorkbook.createSheet(templateSheet.getSheetName());
            newSheet.addMergedRegion(CellRangeAddress.valueOf("B1:C3"));

            for (Row templateRow : templateSheet) {
                Row newRow = newSheet.createRow(templateRow.getRowNum());
                newRow.setHeight(templateRow.getHeight());

                // Đọc độ dài và độ rộng của các cột từ tệp mẫu
                for (int j = 0; j < templateRow.getLastCellNum(); j++) {
                    Cell templateCell = templateRow.getCell(j);
                    if (templateCell != null) {
                        // Lấy độ dài cột từ tệp mẫu
                        int columnWidth = templateSheet.getColumnWidth(j);
                        // Sao chép độ rộng cột cho tệp mới
                        newSheet.setColumnWidth(j, columnWidth);
                    }
                }

                for (int j = 0; j < templateRow.getLastCellNum(); j++) {
                    Cell templateCell = templateRow.getCell(j);
                    if (templateCell != null) {
                        Cell newCell = newRow.createCell(j);
                        CellStyle newCellStyle = newWorkbook.createCellStyle();
                        newCellStyle.cloneStyleFrom(templateCell.getCellStyle());
                        newCell.setCellStyle(newCellStyle);

                        switch (templateCell.getCellType()) {
                            case STRING:
                                newCell.setCellValue(templateCell.getStringCellValue());
                                break;
                            case NUMERIC:
                                newCell.setCellValue(templateCell.getNumericCellValue());
                                break;
                            default:
                                newCell.setCellValue(templateCell.getStringCellValue());
                        }
                    }
                }
            }
        }

        // Bước 4: Tạo tệp Excel mới trong bộ nhớ
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        newWorkbook.write(byteArrayOutputStream);

        // Trả về dữ liệu Excel dưới dạng mảng byte
        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Disposition", "attachment; filename=exported.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(excelBytes);
    }

    @GetMapping("hien-thi-tat-ca")
    public ResponseEntity<?> hienThiTatCa() {
        try{
            return new ResponseEntity<>(accService.getAllKhachHangNoPageable(), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}