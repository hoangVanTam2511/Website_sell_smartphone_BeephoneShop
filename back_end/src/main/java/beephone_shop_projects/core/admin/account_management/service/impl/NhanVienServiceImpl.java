package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.AddNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.SearchAccountRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.config.mail.EmailService;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@Service
public class NhanVienServiceImpl implements NhanVienService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<Account> getAllNV(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return accountRepository.getAllNV(pageable);
    }

    @Override
    public Page<Account> getAll(SearchAccountRequest request) {
        if (request.getPage() == null) {
            request.setPage(1);
        }
        if (request.getPageSize() == null) {
            request.setPageSize(5);
        }
        if (request.getKeyword() == null) {
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPage() - 1, 2);
        Page<Account> ac = accountRepository.findAllHaha(pageable, request);
        return ac;
    }

    @Override
    public List<Account> getAllNVienNoPage() {
        return accountRepository.getAllNVienNoPage();
    }

    @Override
    public Account addNV(AddNhanVienRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("NV%04d", number);
        String hoVaTen = request.getHoVaTen();

        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", "");
        String hoVaTenWithoutDiacritics = removeDiacritics(hoVaTenWithoutSpaces);
        Date date = null;
        try {
            date = new SimpleDateFormat("dd/MM/yyyy").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String[] specialCharsArray = {"!", "@", "#", "$", "%", "^", "&", "*", "+", "-"};
        String specialChars = getRandomSpecialChars(specialCharsArray);
        String matKhau = hoVaTenWithoutDiacritics + specialChars + code;
        Account kh = new Account().builder()
                .email(request.getEmail())
                .ngaySinh(date)
                .idRole(roleRepository.findByMa("role1"))
                .hoVaTen(request.getHoVaTen())
                .anhDaiDien(request.getAnhDaiDien())
                .gioiTinh(request.getGioiTinh())
                .canCuocCongDan(request.getCanCuocCongDan())
                .trangThai(StatusAccountCus.LAM_VIEC)
                .ma(code)
                .matKhau(passwordEncoder.encode(matKhau))
                .soDienThoai(request.getSoDienThoai())
                .build();

        Context context = new Context();
        context.setVariable("password",matKhau);
        emailService.sendEmailWithHtmlTemplate(request.getEmail(), "Mật khẩu của bạn", "email-get-pass-template", context);

        return accountRepository.save(kh);
    }

    @Override
    public void doiTrangThai(String id) {
        accountRepository.doiTrangThaiNV(id);
    }

    @Override
    public Account updateNV(CreateNhanVienRequest request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        if (optional.isPresent()) {
            optional.get().setMa(request.getMa());
            optional.get().setId(id);
            optional.get().setEmail(request.getEmail());
            optional.get().setTrangThai(request.getTrangThai());
            optional.get().setIdRole(roleRepository.findByMa("role1"));
            optional.get().setMatKhau(request.getMatKhau());
            optional.get().setNgaySinh(request.getNgaySinh());
            optional.get().setAnhDaiDien(request.getAnhDaiDien());
            optional.get().setCanCuocCongDan(request.getCanCuocCongDan());
            optional.get().setGioiTinh(request.getGioiTinh());
            optional.get().setHoVaTen(request.getHoVaTen());
            optional.get().setSoDienThoai(request.getSoDienThoai());
        }
        return accountRepository.save(optional.get());
    }

    @Override
    public Page<Account> search(Optional<String> tenSearch,Integer acc,  Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return accountRepository.searchAllNV(tenSearch, pageable);
    }

    @Override
    public Account getOne(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public Page<Account> filterTrangThai(StatusAccountCus trangThai, Integer pageableNo) {
        Pageable pageable = PageRequest.of(pageableNo - 1, 5);
        return accountRepository.filterTrangThai(trangThai, pageable);
    }

    @Override
    public Boolean isPhoneNumberUnique(String phoneNumberToCheck) {
        return accountRepository.existsBySoDienThoaiNhanVien(phoneNumberToCheck);
    }

    @Override
    public Boolean isPhoneNumberUniqueCustomer(String phoneNumberToCheck) {
        return accountRepository.existsBySoDienThoaiKhachHang(phoneNumberToCheck);
    }

    @Override
    public Boolean existsByCanCuocCongDan(String canCuoc) {
        return accountRepository.existsByCanCuocCongDan(canCuoc);
    }

    public static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[^\\p{Alnum}]+", "");
    }

    public static String getRandomSpecialChars(String[] specialCharsArray) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            int randomIndex = random.nextInt(specialCharsArray.length);
            sb.append(specialCharsArray[randomIndex]);
        }

        return sb.toString();
    }

}
