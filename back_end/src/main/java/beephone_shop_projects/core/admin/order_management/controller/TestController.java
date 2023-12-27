package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.converter.PaymentConverter;
import beephone_shop_projects.core.admin.order_management.model.request.*;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ImeiCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.CartItemServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.utils.BarcodeGenerator;
import beephone_shop_projects.utils.ReadFileExcelUtils;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
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

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
  private HinhThucThanhToanCustomRepository hinhThucThanhToanCustomRepository;

  @Autowired
  private PaymentConverter paymentConverter;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private CartItemServiceImpl cartItemService;

  @Autowired
  private BarcodeGenerator barcodeGenerator;

  @Autowired
  private ImeiCustomRepository imeiCustomRepository;

  @GetMapping("/barcode/{code}")
  public ResponseEntity<String> generateBarcode(@PathVariable String code) {
    try {
      String getUri = barcodeGenerator.generateBarcodeImageBase64Url(code, BarcodeFormat.QR_CODE);
      return new ResponseEntity<>(getUri, org.springframework.http.HttpStatus.OK);

    } catch (Exception e) {
      // Xử lý lỗi nếu có
      return ResponseEntity.status(500).body(null);
    }
  }

  @GetMapping("/imeis/all")
  public ResponseObject home10111() {
    List<Imei> imeis = imeiCustomRepository.findAll();
    return new ResponseObject(imeis);
  }

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
  @DeleteMapping("/carts/order/{id}")
  public ResponseObject home44(@PathVariable("id") String id, @RequestBody OrderItemRequest req) throws Exception {
    boolean deleted = cartItemService.removeCartItemOrderById(id, req);
    if (deleted) {
      return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @DeleteMapping("/carts/{id}")
  public ResponseObject home4(@PathVariable("id") String id) throws Exception {
    boolean deleted = cartItemService.removeCartItemById(id);
    if (deleted) {
      return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @PutMapping("/carts/order/refund")
  public ResponseObject refund(@RequestBody OrderItemsCustomRefundRequest req) throws Exception {
    OrderItemResponse refundProduct = cartItemService.refundOrder(req);
    return new ResponseObject(refundProduct);
  }

  @PutMapping("/carts/order/scanner")
  public ResponseObject home2222122(@RequestBody OrderItemRequest req) throws Exception {
    OrderItemResponse addProductItemToCartOrderScanner = cartItemService.addProductItemToCartOrderByScanner(req);
    return new ResponseObject(addProductItemToCartOrderScanner);
  }

  @PutMapping("/carts/scanner")
  public ResponseObject home22222(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse addProductItemToCartScanner = cartItemService.addProductItemToCartByScanner(req);
    return new ResponseObject(addProductItemToCartScanner);
  }

  @PutMapping("/carts")
  public ResponseObject home2(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse addProductItemToCart = cartItemService.addProductItemToCart(req);
    return new ResponseObject(addProductItemToCart);
  }

  @PutMapping("/carts/order")
  public ResponseObject home2222(@RequestBody OrderItemRequest req) throws Exception {
    OrderItemResponse addProductItemToCartOrder = cartItemService.addProductItemToCartOrder(req);
    return new ResponseObject(addProductItemToCartOrder);
  }

  @PutMapping("/carts/order/amount")
  public ResponseObject home22222(@RequestBody OrderItemRequest req) throws Exception {
    OrderItemResponse updateProductItemToCartOrder = cartItemService.updateAmountItemInCartOrder(req);
    return new ResponseObject(updateProductItemToCartOrder);
  }

  @PutMapping("/carts/amount")
  public ResponseObject home222(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse updatedCartItem = cartItemService.updateAmountItemInCart(req);
    return new ResponseObject(updatedCartItem);
  }

  @GetMapping("/payments/{id}")
  public ResponseObject home(@PathVariable("id") String id) {
    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
    return new ResponseObject(list);
  }

  @DeleteMapping("/payment/{id}")
  public ResponseObject deletePaymentCash(@PathVariable String id, @RequestParam("orderId") String orderId) throws Exception {
    HoaDon findOrder = hoaDonRepository.getOrderPendingById(orderId);
    if (findOrder != null) {
      Optional<HinhThucThanhToan> payment = hinhThucThanhToanCustomRepository.findById(id);
      if (payment.isPresent()) {
        if (payment.get().getSoTienThanhToan() != null) {
          findOrder.setTienKhachTra(findOrder.getTienKhachTra().subtract(payment.get().getSoTienThanhToan()));
          hoaDonRepository.save(findOrder);
          hinhThucThanhToanCustomRepository.delete(payment.get());
        }
      }
    }
    return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
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
    if (imeis.size() > 15) {
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
