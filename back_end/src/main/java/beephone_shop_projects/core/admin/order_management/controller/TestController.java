package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ImeisRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.CartItemServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.utils.CloudinaryUtils;
import beephone_shop_projects.utils.ReadFileExcelUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

  @Autowired
  private ProductDetailRepository sanPhamChiTietRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private CartRepositoryImpl gioHangRepository;

  @Autowired
  private OrderRepositoryImpl hoaDonRepository;

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private CartItemServiceImpl cartItemService;

  @Autowired
  private ProductRepositoryImpl productRepository;

  @GetMapping("/test1")
  public ResponseEntity<?> home10() {
    List<HoaDon> hoaDons = hoaDonRepository.getOrdersPending();
    return new ResponseEntity<>(hoaDons.stream().map(s -> modelMapper.map(s, OrderResponse.class)), org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/test2/{id}")
  public ResponseObject home10(@PathVariable String id) {
    OrderResponse hoaDon = hoaDonService.getOrderPendingById(id);
    return new ResponseObject(hoaDon);
  }

  @GetMapping("/products")
  public ResponseObject home1() {
    return new ResponseObject(sanPhamChiTietRepository.getProducts().stream().map(s -> modelMapper.map(s, ProductItemConfigurationResponse.class)));
  }

  @GetMapping("/products/all")
  public ResponseObject home111() {
    return new ResponseObject(productRepository.findAll().stream().map(s -> modelMapper.map(s, ProductCustomResponse.class)));
  }

//  @PostMapping("/image1")
//  public ResponseObject home3(@RequestParam String url) {
//    String nweUrl = new CloudinaryUtils().uploadImage(url);
//    return new ResponseObject(nweUrl);
//  }

//  @GetMapping("/carts/{id}")
//  public ResponseEntity<?> home3(@PathVariable("id") String id) {
//    List<GioHangChiTiet> list = cartItemRepository.getAllByIdCart(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }

  @DeleteMapping("/carts/{id}")
  public ResponseObject home4(@PathVariable("id") String id) throws Exception {
    boolean deleted = cartItemService.removeCartItemById(id);
    if (deleted) {
      return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @PutMapping("/carts")
  public ResponseObject home2(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse addProductItemToCart = cartItemService.addProductItemToCart(req);
    return new ResponseObject(addProductItemToCart);
  }

  @PutMapping("/carts/amount")
  public ResponseObject home222(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse updatedCartItem = cartItemService.updateAmountItemInCart(req);
    return new ResponseObject(updatedCartItem);
  }

  @GetMapping("/payments/{id}")
  public ResponseEntity<?> home(@PathVariable("id") String id) {
    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
    return new ResponseEntity<>(list, org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/test1000/{id}")
  public ResponseObject homegg(@PathVariable("id") String id) {
    return new ResponseObject(sanPhamChiTietRepository.findProductById(id));
  }

  @PostMapping("/export-excel-by")
  public ResponseEntity<byte[]> exportExcel(@RequestBody ImeisRequest imeisRequest) throws IOException {
    String templateFilePath = "static/assets/excel-template/import-imei-by-product-template.xlsx";
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

    List<ImeiRequest> imeis = imeisRequest.getImeis();
    Sheet sheet = newWorkbook.getSheetAt(0);
    int rowNum = 4; // Bắt đầu từ hàng thứ 5 (B5)

    Row emptyRow = sheet.getRow(4); //Row 4
    Short height = emptyRow.getHeight();

    Cell emptyCellA = emptyRow.getCell(0); //A5
    CellStyle emptyCellStyleA = emptyCellA.getCellStyle();

    Cell emptyCellD = emptyRow.getCell(3); //D5
    CellStyle emptyCellStyleD = emptyCellD.getCellStyle();

    Cell emptyCellSTT = emptyRow.getCell(1); //B5
    CellStyle emptyCellStyleSTT = emptyCellSTT.getCellStyle();

    Cell emptyCellImei = emptyRow.getCell(2); //C5
    CellStyle emptyCellStyleImei = emptyCellImei.getCellStyle();

    int stt = 1;
    for (ImeiRequest imei : imeis) {
      Row row = sheet.createRow(rowNum);

      Cell cellA = row.createCell(0); // Cột A
      cellA.setCellStyle(emptyCellStyleA);

      Cell cellD = row.createCell(3); // Cột D
      cellD.setCellStyle(emptyCellStyleD);

      Cell cellSTT = row.createCell(1); // Cột B
      cellSTT.setCellValue(stt++);
      cellSTT.setCellStyle(emptyCellStyleSTT);

      Cell cellImei = row.createCell(2); // Cột C
      cellImei.setCellValue(imei.getImei());
      cellImei.setCellStyle(emptyCellStyleImei);

      row.setHeight(height);
      rowNum++;
    }
    if (imeis.size() > 15){
      Row lastRow = sheet.createRow(rowNum);
      lastRow.setHeight(height);
      Cell cellA = lastRow.createCell(0); // Cột A
      cellA.setCellStyle(emptyCellStyleA);

      Cell cellD = lastRow.createCell(3); // Cột D
      cellD.setCellStyle(emptyCellStyleA);

      Cell cellSTT = lastRow.createCell(1); // Cột B
      cellSTT.setCellStyle(emptyCellStyleA);

      Cell cellImei = lastRow.createCell(2); // Cột C
      cellImei.setCellStyle(emptyCellStyleA);
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

  @PostMapping("/create-excel-template-all")
  public ResponseEntity<byte[]> createExcelTemplateAll() throws IOException {
    String templateFilePath = "static/assets/excel-template/import-imei-all-template.xlsx";
    Workbook templateWorkbook = new ReadFileExcelUtils().readExcelTemplate(templateFilePath);
    Workbook newWorkbook = new XSSFWorkbook();

    for (int i = 0; i < templateWorkbook.getNumberOfSheets(); i++) {
      Sheet templateSheet = templateWorkbook.getSheetAt(i);
      Sheet newSheet = newWorkbook.createSheet(templateSheet.getSheetName());
      newSheet.addMergedRegion(CellRangeAddress.valueOf("B1:D3"));


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

  @PostMapping("/create-excel-template-by")
  public ResponseEntity<byte[]> createExcelTemplateBy() throws IOException {
    String templateFilePath = "static/assets/excel-template/import-imei-by-product-template.xlsx";
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


}
