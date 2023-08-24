package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.DiaChiRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.DiaChiService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;
    @Override
    public List<DiaChi> getAllDiaChi() {
        return diaChiRepository.findAll();
    }

    @Override
    public DiaChi getOne(UUID id) {
        return diaChiRepository.findById(String.valueOf(id)).get();
    }

    @Override
    public DiaChi addDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, UUID id) {
        DiaChi newDC=DiaChi.builder()
                .trangThai(diaChiKhachHangRequest.getTrangThai())
                .tinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho())
                .account(accountRepository.findById(String.valueOf(id)).get())
                .xaPhuong(diaChiKhachHangRequest.getXaPhuong())
                .diaChi(diaChiKhachHangRequest.getDiaChi())
                .hoTenKH(diaChiKhachHangRequest.getHoTenKH())
                .build();
        accountRepository.findById(String.valueOf(id)).get().getDiaChiList().add(newDC);
        return diaChiRepository.save(newDC);
    }


    @Override
    public DiaChi addKH(DiaChiKhachHangRequest request) {

        DiaChi kh = new DiaChi().builder()
                .account(accountRepository.findById(request.getAccount()).get())
                .hoTenKH(request.getHoTenKH())
                .quanHuyen(request.getQuanHuyen())
                .xaPhuong(request.getXaPhuong())
                .tinhThanhPho(request.getTinhThanhPho())
                .soDienThoai(request.getSoDienThoai())
                .diaChi(request.getDiaChi())
                .build();
        return diaChiRepository.save(kh);
    }

    @Override
    public DiaChi updateDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, UUID id) {
        return null;
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
    public static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[^\\p{Alnum}]+", "");
    }

}
