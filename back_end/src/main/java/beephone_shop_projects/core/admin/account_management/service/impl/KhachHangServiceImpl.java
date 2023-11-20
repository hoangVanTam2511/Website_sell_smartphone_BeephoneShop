package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.KhachHangService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    @Override
    public Page<AccountResponse> getAllKH(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return accountRepository.getAllKH(pageable);
    }

    @Override
    public Account addKH(CreateKhachHangRequest request) {
        Random random = new Random();

        String hoVaTen = request.getHoVaTen();
        int number = random.nextInt(10000);
        String code = String.format("KH%04d", number);
        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", "");
        Date date = null;
        try {
            date = new SimpleDateFormat("dd/MM/yyyy").parse(request.getNgaySinh());
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
                .trangThai(StatusAccountCus.HOAT_DONG)
                .ma(code)
                .matKhau(matKhau)
                .soDienThoai(request.getSoDienThoai())
                .build();
        return accountRepository.save(kh);
    }

    @Override
    public Account getOne(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public Account updateKH(CreateKhachHangRequest request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        Date date = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC")); // Set the time zone to UTC
            date = dateFormat.parse(String.valueOf(request.getNgaySinh()));
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
}
