package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;
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
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Page<Account> getAllNV(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 20);
        return accountRepository.getAllNV(pageable);
    }

    @Override
    public List<Account> getAllNVienNoPage() {
        return accountRepository.getAllNVienNoPage();
    }

    @Override
    public Account addNV(CreateAccountRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("NV%04d", number);
        Date date = null;
        try {
            date = new SimpleDateFormat("dd/MM/yyyy").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String hoVaTen = request.getHoVaTen();

        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", ""); // Loại bỏ khoảng trắng
        String hoVaTenWithoutDiacritics = removeDiacritics(hoVaTenWithoutSpaces);

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
                .quanHuyen(request.getQuanHuyen())
                .xaPhuong(request.getXaPhuong())
                .canCuocCongDan(request.getCanCuocCongDan())
                .tinhThanhPho(request.getTinhThanhPho())
                .trangThai(StatusAccountCus.LAM_VIEC)
                .ma(code)
                .matKhau(matKhau)
                .soDienThoai(request.getSoDienThoai())
                .diaChi(request.getDiaChi())
                .build();
        return accountRepository.save(kh);
    }

    @Override
    public void doiTrangThai(String id) {
        accountRepository.doiTrangThaiNV(id);
    }

    @Override
    public Account updateNV(CreateAccountRequest request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        Date date = null;
        try {
            date = new SimpleDateFormat("dd/MM/yyyy").parse(String.valueOf(request.getNgaySinh()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        if (optional.isPresent()) {
            optional.get().setMa(request.getMa());
            optional.get().setId(id);
            optional.get().setEmail(request.getEmail());
            optional.get().setDiaChi(request.getDiaChi());
            optional.get().setTrangThai(request.getTrangThai());
            optional.get().setDiaChi(request.getDiaChi());
            optional.get().setIdRole(roleRepository.findByMa("role1"));
            optional.get().setMatKhau(request.getMatKhau());
            optional.get().setNgaySinh(date);
            optional.get().setAnhDaiDien(request.getAnhDaiDien());
            optional.get().setCanCuocCongDan(request.getCanCuocCongDan());
            optional.get().setTinhThanhPho(request.getTinhThanhPho());
            optional.get().setQuanHuyen(request.getQuanHuyen());
            optional.get().setXaPhuong(request.getXaPhuong());
            optional.get().setGioiTinh(request.getGioiTinh());
            optional.get().setHoVaTen(request.getHoVaTen());
            optional.get().setSoDienThoai(request.getSoDienThoai());
            accountRepository.save(optional.get());
        }
        return accountRepository.save(optional.get());
    }

    @Override
    public Page<Account> search(Optional<String> tenSearch, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 20);
        return accountRepository.searchAllNV(tenSearch, pageable);
    }

    @Override
    public Account getOne(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public Page<Account> filterTrangThai(StatusAccountCus trangThai, Integer pageableNo) {
        Pageable pageable = PageRequest.of(pageableNo - 1, 100);
        return accountRepository.filterTrangThai(trangThai, pageable);
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
