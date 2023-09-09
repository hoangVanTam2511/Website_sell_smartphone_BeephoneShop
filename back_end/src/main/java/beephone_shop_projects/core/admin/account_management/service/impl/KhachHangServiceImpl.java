package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.DiaChiRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.KhachHangService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service

public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public Page<AccountResponse> getAllKH(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 20);
        return accountRepository.getAllKH(pageable);
    }

//    @Override
//    public Page<AccountResponse> searchAllKHang(Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        return accountRepository.searchAllKH(pageable);
//    }

    @Override
    public Account addKH(CreateKhachHangRequest request) {
        Random random = new Random();

        String hoVaTen = request.getHoVaTen();
        int number = random.nextInt(10000);
        String code = String.format("KH%04d", number);
        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", "");
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String hoVaTenWithoutDiacritics = removeDiacritics(hoVaTenWithoutSpaces);
        String[] specialCharsArray = {"!", "@", "#", "$", "%", "^", "&", "*", "+", "-"};
        String specialChars = getRandomSpecialChars(specialCharsArray);
        String matKhau = hoVaTenWithoutDiacritics + specialChars + code;
        Account kh = new Account().builder()
                .email(request.getEmail())
                .ngaySinh(date)
                .idRole(roleRepository.findByMa("role2"))
                .hoVaTen(request.getHoVaTen())
                .anhDaiDien(request.getAnhDaiDien())
                .gioiTinh(request.getGioiTinh())
                .trangThai(1)
                .ma(code)
                .matKhau(matKhau)
                .soDienThoai(request.getSoDienThoai())
                .build();
//        Account khachHang = addKH(request);

////        // Thêm nhiều địa chỉ vào khách hàng
//        for (DiaChi diaChi : diaChiList) {
//            addDiaChiToKhachHang(khachHang, diaChi);
//        }
        return accountRepository.save(kh);
    }

    public void addDiaChiToKhachHang(Account khachHang, DiaChi diaChi) {
        khachHang.getDiaChiList().add(diaChi);  // Thêm địa chỉ vào danh sách địa chỉ của khách hàng
        accountRepository.save(khachHang);      // Lưu cập nhật vào cơ sở dữ liệu
    }

    @Override
    public Account getOne(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public Account findAccount(String ma) {
//        return accountRepository.findByMa(ma);
        return null;
    }

    @Override
    public Account updateKH(CreateKhachHangRequest request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        if (optional.isPresent()) {
            optional.get().setId(id);
            optional.get().setMa(request.getMa());
            optional.get().setMatKhau(request.getMatKhau());
            optional.get().setEmail(request.getEmail());
            optional.get().setTrangThai(request.getTrangThai());
            optional.get().setIdRole(roleRepository.findByMa("role2"));
            optional.get().setNgaySinh(date);
            optional.get().setAnhDaiDien(request.getAnhDaiDien());
            optional.get().setGioiTinh(request.getGioiTinh());
            optional.get().setHoVaTen(request.getHoVaTen());
            optional.get().setSoDienThoai(request.getSoDienThoai());
            accountRepository.save(optional.get());
            return accountRepository.save(optional.get());
        }
        return optional.get();
    }

    @Override
    public Page<AccountResponse> search(Optional<String> tenSearch, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 20);
        return accountRepository.searchAllKH(tenSearch, pageable);
    }

    @Override
    public List<CreateAccountRequest> importExcelData(InputStream fileInputStream) throws IOException {
        Workbook workbook = WorkbookFactory.create(fileInputStream);
        Sheet sheet = workbook.getSheetAt(0);
        List<CreateAccountRequest> createAccountRequests = new ArrayList<>();
        for (Row row : sheet) {
            // Skip the header row (assuming it's the first row)
            if (row.getRowNum() == 0) {
                continue;
            }
            String ma = row.getCell(1).getStringCellValue();
            String hoVaTen = row.getCell(2).getStringCellValue();
            String ngaySinh = row.getCell(3).getStringCellValue();
            String email = row.getCell(4).getStringCellValue();
            String diaChi = row.getCell(5).getStringCellValue();
            String soDienThoai = row.getCell(6).getStringCellValue();
            String trangThai = row.getCell(7).getStringCellValue();
            String matKhau = row.getCell(8).getStringCellValue();
            CreateAccountRequest createAccountRequest = new CreateAccountRequest();

            createAccountRequest.setHoVaTen(hoVaTen);
            createAccountRequest.setEmail(email);
            createAccountRequest.setDiaChi(diaChi);
            createAccountRequest.setNgaySinh(ngaySinh);
            createAccountRequest.setMa(ma);
            createAccountRequest.setSoDienThoai(soDienThoai);
            createAccountRequest.setTrangThai(1);
            createAccountRequest.setSoDienThoai(trangThai);
            createAccountRequest.setMatKhau(matKhau);
            createAccountRequest.setIdRole(roleRepository.findByMa("role2").toString());
//            ma ten ns email sdt diaChi trangThai
            createAccountRequests.add(createAccountRequest);
        }
        workbook.close();
        return createAccountRequests;
    }

    @Override
    public void doiTrangThai(String id) {
        accountRepository.doiTrangThai(id);
    }

    public static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[^\\p{Alnum}]+", "");
    }

    public static String getRandomSpecialChars(String[] specialCharsArray) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            int randomIndex = random.nextInt(specialCharsArray.length);
            sb.append(specialCharsArray[randomIndex]);
        }

        return sb.toString();
    }
}
