//package beephone_shop_projects.core.admin.account_management.service.impl;
//
//import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
//import beephone_shop_projects.core.admin.account_management.service.ExportService;
//import beephone_shop_projects.entity.Account;
//import org.apache.poi.ss.usermodel.*;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.List;
//
//@Service
//
//public class ExportServiceImpl implements ExportService {
//    @Autowired
//    private KhachHangServiceImpl accService;
//    @Autowired
//    private NhanVienServiceImpl nvService;
//
//    @Override
//    public byte[] exportExcelData(Integer pageNo) throws IOException {
//
//        Workbook workbook = new XSSFWorkbook();
//
//        Page<AccountResponse> khachHangPage = accService.getAllKH(pageNo);
//        Sheet sheet = workbook.createSheet("Danh sách KH");
//
//        // Tạo hàng đầu tiên và set header cho từng cột
//        Row headerRow = sheet.createRow(0);
//        headerRow.createCell(0).setCellValue("Họ và Tên");
//        headerRow.createCell(1).setCellValue("Email");
//        headerRow.createCell(2).setCellValue("Mã");
//        headerRow.createCell(3).setCellValue("Địa chỉ");
//        headerRow.createCell(4).setCellValue("Ngày sinh");
//        headerRow.createCell(5).setCellValue("Số điện thoại");
//        headerRow.createCell(6).setCellValue("Trạng thái");
//
//        // Áp dụng định dạng cho hàng đầu tiên (bảng bao quanh file)
//        CellStyle headerStyle = workbook.createCellStyle();
//        headerStyle.setBorderBottom(BorderStyle.THICK);
//        headerStyle.setBorderTop(BorderStyle.THICK);
//        headerStyle.setBorderLeft(BorderStyle.THICK);
//        headerStyle.setBorderRight(BorderStyle.THICK);
//        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
//        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        Font headerFont = workbook.createFont();
//        headerFont.setBold(true);
//        headerStyle.setFont(headerFont);
//
//        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
//            Cell cell = headerRow.getCell(i);
//            cell.setCellStyle(headerStyle);
//        }
//
//        // Áp dụng định dạng cho các ô trong hàng dữ liệu
//        CellStyle dataStyle = workbook.createCellStyle();
//        dataStyle.setBorderBottom(BorderStyle.THIN);
//        dataStyle.setBorderTop(BorderStyle.THIN);
//        dataStyle.setBorderLeft(BorderStyle.THIN);
//        dataStyle.setBorderRight(BorderStyle.THIN);
//        dataStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
//        dataStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        Font dataFont = workbook.createFont();
//        dataFont.setFontHeightInPoints((short) 12);
//        dataStyle.setFont(dataFont);
//        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy/MM/dd");
//
//        int rowNum = 1;
//        for (AccountResponse khachHang : khachHangPage.getContent()) {
////            Row row = sheet.createRow(rowNum++);
////            row.createCell(0).setCellValue(khachHang.getHoVaTen());
////            row.createCell(1).setCellValue(khachHang.getEmail());
////            row.createCell(2).setCellValue(khachHang.getMa());
////            row.createCell(3).setCellValue(khachHang.getDiaChi());
////            Date ngaySinh = khachHang.getNgaySinh();
////            String formattedNgaySinh = dateFormatter.format(ngaySinh);
////            row.createCell(4).setCellValue(formattedNgaySinh);
////            row.createCell(5).setCellValue(khachHang.getSoDienThoai());
////            row.createCell(6).setCellValue(khachHang.getTrangThai() == 1 ? "Hoạt động" : "Nghỉ việc");
////
////            // Áp dụng định dạng cho các ô trong hàng dữ liệu
////            for (int i = 0; i < row.getLastCellNum(); i++) {
////                Cell cell = row.getCell(i);
////                cell.setCellStyle(dataStyle);
////            }
//        }
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        workbook.write(outputStream);
//        workbook.close();
//
//        return outputStream.toByteArray();
//    }
//
//    @Override
//    public byte[] exportExcelDataNV() throws IOException {
//        Workbook workbook = new XSSFWorkbook();
//
//        List<Account> nhanVien = nvService.getAllNVienNoPage();
//        Sheet sheet = workbook.createSheet("Danh sách Nhân Viên");
//        Row headerRow = sheet.createRow(0);
//        headerRow.createCell(0).setCellValue("STT");
//        headerRow.createCell(1).setCellValue("Mã");
//        headerRow.createCell(2).setCellValue("Họ và Tên");
//        headerRow.createCell(3).setCellValue("Email");
//        headerRow.createCell(4).setCellValue("Số điện thoại");
//        headerRow.createCell(5).setCellValue("Địa chỉ");
//        headerRow.createCell(6).setCellValue("Trạng thái");
//
//
//        // Tạo một đối tượng kiểu Font cho tiêu đề
//        Font headerFont = workbook.createFont();
//        headerFont.setBold(true);
//        headerFont.setColor(IndexedColors.WHITE.getIndex());
//
//        // Tạo một đối tượng kiểu CellStyle cho tiêu đề
//        CellStyle headerStyle = workbook.createCellStyle();
//        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
//        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        headerStyle.setFont(headerFont);
//
//        // Tạo một đối tượng kiểu Font cho dữ liệu
//        Font dataFont = workbook.createFont();
//        dataFont.setColor(IndexedColors.BLACK.getIndex());
//
//        // Tạo một đối tượng kiểu CellStyle cho dữ liệu
//        CellStyle dataStyle = workbook.createCellStyle();
//        dataStyle.setFont(dataFont);
//
//        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
//            Cell cell = headerRow.getCell(i);
//            cell.setCellStyle(headerStyle);
//        }
//
//        dataFont.setFontHeightInPoints((short) 12);
//        dataStyle.setFont(dataFont);
//
//
//        // Áp dụng định dạng cho các ô trong hàng dữ liệu
//        int rowNum = 1;
//        for (int index = 0; index < nhanVien.size(); index++) {
//            Account newNV = nhanVien.get(index);
//            Row row = sheet.createRow(rowNum++);
//            row.createCell(0).setCellValue(index + 1);
//            row.createCell(1).setCellValue(newNV.getMa());
//            row.createCell(2).setCellValue(newNV.getHoVaTen());
//            row.createCell(3).setCellValue(newNV.getEmail());
//            row.createCell(4).setCellValue(newNV.getSoDienThoai());
//            row.createCell(5).setCellValue(newNV.getDiaChi() + " " + newNV.getXaPhuong() + " " + newNV.getQuanHuyen() + " " + newNV.getTinhThanhPho());
//            row.createCell(6).setCellValue(newNV.getTrangThai() == 1 ? "Hoạt động" : "Vô hiệu hóa");
//
//            // Áp dụng định dạng cho các ô trong hàng dữ liệu
//            for (int i = 0; i < row.getLastCellNum(); i++) {
//                Cell cell = row.getCell(i);
//                cell.setCellStyle(dataStyle);
//            }
//        }
//        sheet.setColumnWidth(0, 2000);
//        sheet.setColumnWidth(1, 3000);
//        sheet.setColumnWidth(2, 10000);
//        sheet.setColumnWidth(3, 10000);
//        sheet.setColumnWidth(4, 4000);
//        sheet.setColumnWidth(5, 10000);
//        sheet.setColumnWidth(6, 4000);
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        workbook.write(outputStream);
//        workbook.close();
//
//        return outputStream.toByteArray();
//    }
//}
