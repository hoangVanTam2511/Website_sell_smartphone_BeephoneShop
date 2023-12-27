package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.AddKhachHangExcelRequest;
import beephone_shop_projects.core.admin.account_management.model.request.AddKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.KhachHangService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.config.mail.EmailService;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<AccountResponse> getAllKH(FindAccountRequest request) {
        if (request.getPageNo() == null) {
            request.setPageNo(1);
        }
        if (request.getPageSize() == null) {
            request.setPageSize(5);
        }
        if (request.getKeyword() == null) {
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize());
        return accountRepository.getAllKH(pageable, request);
    }

    @Override
    public Page<Account> getAll(FindAccountRequest search) {
        if (search.getPageNo() == null) {
            search.setPageNo(1);
        }
        if (search.getPageSize() == null) {
            search.setPageSize(5);
        }
        if (search.getKeyword() == null) {
            search.setKeyword("");
        }
        Pageable pageable = PageRequest.of(search.getPageNo()-1, search.getPageSize());
        Page<Account> page = accountRepository.findAllKH(pageable, search);
        return page;
    }

    @Override
    public Account addKH(AddKhachHangRequest request) {
        Random random = new Random();
        Date date = null;
        try {
            if(!request.getNgaySinh().isEmpty()){
                date = new SimpleDateFormat("dd/MM/yyyy").parse(request.getNgaySinh());
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String hoVaTen = request.getHoVaTen();
        int number = random.nextInt(10000);
        String code = String.format("KH%04d", number);
        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", "");
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
                .trangThai(StatusAccountCus.HOAT_DONG)
                .ma(code)
                .matKhau(passwordEncoder.encode(matKhau))
                .soDienThoai(request.getSoDienThoai())
                .build();

        Context context = new Context();
        context.setVariable("password", matKhau);
        emailService.sendEmailWithHtmlTemplate(request.getEmail(), "Mật khẩu của bạn", "email-get-pass-template", context);
        return accountRepository.save(kh);
    }

    @Override
    public Account getOne(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public Account updateKH(CreateKhachHangRequest request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        if (optional.isPresent()) {
            optional.get().setId(id);
            optional.get().setMa(request.getMa());
            optional.get().setMatKhau(request.getMatKhau());
            optional.get().setEmail(request.getEmail());
            optional.get().setTrangThai(request.getTrangThai());
            optional.get().setIdRole(roleRepository.findByMa("role2"));
            optional.get().setNgaySinh(request.getNgaySinh());
            optional.get().setAnhDaiDien(request.getAnhDaiDien());
            optional.get().setGioiTinh(request.getGioiTinh());
            optional.get().setHoVaTen(request.getHoVaTen());
            optional.get().setSoDienThoai(request.getSoDienThoai());
            return accountRepository.save(optional.get());
        }
        return optional.get();
    }

    @Override
    public Page<AccountResponse> search(Optional<String> tenSearch, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return accountRepository.searchAllKH(tenSearch, pageable);
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

    @Override
    public Boolean isPhoneNumberUnique(String phoneNumberToCheck) {
        return accountRepository.existsBySoDienThoaiKhachHang(phoneNumberToCheck);
    }

    public Account addKHByImportExcel(AddKhachHangExcelRequest request) {
        Random random = new Random();
        Date date = null;

        String hoVaTen = request.getHoVaTen();
        int number = random.nextInt(10000);
        String code = String.format("KH%04d", number);
        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", "");
        String hoVaTenWithoutDiacritics = removeDiacritics(hoVaTenWithoutSpaces);
        String[] specialCharsArray = {"!", "@", "#", "$", "%", "^", "&", "*", "+", "-"};
        String specialChars = getRandomSpecialChars(specialCharsArray);
        String matKhau = hoVaTenWithoutDiacritics + specialChars + code;
        Account kh = new Account().builder()
                .email(request.getEmail())
                .idRole(roleRepository.findByMa("role2"))
                .hoVaTen(request.getHoVaTen())
                .gioiTinh(request.getGioiTinh())
                .trangThai(StatusAccountCus.HOAT_DONG)
                .ma(request.getMa())
                .matKhau(passwordEncoder.encode(matKhau))
                .soDienThoai(request.getSoDienThoai())
                .build();

        Context context = new Context();
        context.setVariable("password", matKhau);
        emailService.sendEmailWithHtmlTemplate(request.getEmail(), "Mật khẩu của bạn", "email-get-pass-template", context);
        return accountRepository.save(kh);
    }

    public ArrayList<AccountResponse> getAllKhachHangNoPageable() {
        return accountRepository.getAllKHNoPageable();
    }
}
