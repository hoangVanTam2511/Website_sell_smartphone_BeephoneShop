package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.DiaChiNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.DiaChiRepository;
import beephone_shop_projects.core.admin.account_management.service.DiaChiService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.*;

@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public List<DiaChi> getAllDiaChi(String id) {
        return diaChiRepository.getAllDiaChi(id);
    }

    @Override
    public DiaChi getOne(UUID id) {
        return diaChiRepository.findById(String.valueOf(id)).get();
    }

    @Override
    @Transactional
    public DiaChi addDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, String id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        Integer newTrangThai = diaChiKhachHangRequest.getTrangThai();

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }

        DiaChi newDC = DiaChi.builder()
                .trangThai(newTrangThai)
                .tinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho())
                .account(account)
                .xaPhuong(diaChiKhachHangRequest.getXaPhuong())
                .quanHuyen(diaChiKhachHangRequest.getQuanHuyen())
                .soDienThoaiKhachHang(diaChiKhachHangRequest.getSoDienThoaiKhachHang())
                .diaChi(diaChiKhachHangRequest.getDiaChi())
                .hoTenKH(diaChiKhachHangRequest.getHoTenKH())
                .ma(diaChiKhachHangRequest.getMa())
                .build();

        DiaChi addedDiaChi = diaChiRepository.save(newDC);

        if (newTrangThai == 1) {
            diaChiRepository.updateTrangThaiAndAddDiaChi(addedDiaChi.getId(), newTrangThai, id);
        }

        return addedDiaChi;
    }

    @Override
    public DiaChi addDiaChiNhanVien(DiaChiNhanVienRequest diaChiNhanVienRequest, String id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        Integer newTrangThai = 1;

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }

        DiaChi newDC = DiaChi.builder()
                .trangThai(newTrangThai)
                .tinhThanhPho(diaChiNhanVienRequest.getTinhThanhPho())
                .account(account)
                .xaPhuong(diaChiNhanVienRequest.getXaPhuong())
                .quanHuyen(diaChiNhanVienRequest.getQuanHuyen())
                .diaChi(diaChiNhanVienRequest.getDiaChi())
                .build();

        DiaChi addedDiaChi = diaChiRepository.save(newDC);

        if (newTrangThai == 1) {
            diaChiRepository.updateTrangThaiAndAddDiaChi(addedDiaChi.getId(), newTrangThai, id);
        }

        return addedDiaChi;
    }

    @Override
    @Transactional
    public void doiTrangThai(String id, String account) {

//        Account account1 = accountRepository.findById(account)
//                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));
//
//        for (DiaChi existingDiaChi : account1.getDiaChiList()) {
//            if (existingDiaChi.getMa().equals(ma)) {
//                existingDiaChi.setTrangThai(1);
//            } else {
//                existingDiaChi.setTrangThai(0);
//            }
//        }
        diaChiRepository.updateTrangThai(id, account);
    }


    @Override
    public void xoaDiaChi(String id) {
        diaChiRepository.deleteById(id);
    }

    @Override
    public DiaChi updateDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, String ma) {
        Optional<DiaChi> optional = diaChiRepository.findById(ma);
        Integer newTrangThai = diaChiKhachHangRequest.getTrangThai();
        Account account = accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }
        if (optional.isPresent()) {


            DiaChi diaChiToUpdate = optional.get();
            if (diaChiKhachHangRequest.getDiaChi() != null) {
                diaChiToUpdate.setDiaChi(diaChiKhachHangRequest.getDiaChi());
            }
            if (diaChiKhachHangRequest.getSoDienThoaiKhachHang() != null) {
                diaChiToUpdate.setSoDienThoaiKhachHang(diaChiKhachHangRequest.getSoDienThoaiKhachHang());
            }
            if (diaChiKhachHangRequest.getHoTenKH() != null) {
                diaChiToUpdate.setHoTenKH(diaChiKhachHangRequest.getHoTenKH());
            }
            if (diaChiKhachHangRequest.getTrangThai() != null) {
                diaChiToUpdate.setTrangThai(newTrangThai);
            }
            if (diaChiKhachHangRequest.getAccount() != null) {
                diaChiToUpdate.setAccount(accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElse(null));
            }
            if (diaChiKhachHangRequest.getTinhThanhPho() != null) {
                diaChiToUpdate.setTinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho());
            }
            if (diaChiKhachHangRequest.getXaPhuong() != null) {
                diaChiToUpdate.setXaPhuong(diaChiKhachHangRequest.getXaPhuong());
            }
            if (diaChiKhachHangRequest.getQuanHuyen() != null) {
                diaChiToUpdate.setQuanHuyen(diaChiKhachHangRequest.getQuanHuyen());
            }

            diaChiRepository.save(diaChiToUpdate);
            return diaChiToUpdate;
        }
        return null;
    }

    @Override
    public DiaChi updateDiaChiNhanVien(DiaChiNhanVienRequest diaChiNhanVien, String id) {
        Optional<DiaChi> optional = Optional.ofNullable(diaChiRepository.findByAccount_Id(id));

        if (optional.isPresent()) {
            DiaChi diaChiToUpdate = optional.get();
            if (diaChiNhanVien.getDiaChi() != null) {
                diaChiToUpdate.setDiaChi(diaChiNhanVien.getDiaChi());
            }
            if (diaChiNhanVien.getAccount() != null) {
                diaChiToUpdate.setAccount(accountRepository.findById(diaChiNhanVien.getAccount()).orElse(null));
            }
            if (diaChiNhanVien.getTinhThanhPho() != null) {
                diaChiToUpdate.setTinhThanhPho(diaChiNhanVien.getTinhThanhPho());
            }
            if (diaChiNhanVien.getXaPhuong() != null) {
                diaChiToUpdate.setXaPhuong(diaChiNhanVien.getXaPhuong());
            }
            if (diaChiNhanVien.getQuanHuyen() != null) {
                diaChiToUpdate.setQuanHuyen(diaChiNhanVien.getQuanHuyen());
            }

            diaChiRepository.save(diaChiToUpdate);
            return diaChiToUpdate;
        }
        return null;
    }

    @Override
    public DiaChi getOneDiaChi(String ma) {
        Optional<DiaChi>  optional=diaChiRepository.findById(ma);
        return optional.get();
    }

    @Override
    public DiaChi searchDiaChi(String id) {
        return diaChiRepository.findById(id).get();
    }

    @Override
    public DiaChi updateDiaChiBy(DiaChiKhachHangRequest diaChiKhachHangRequest, String ma) {
        Optional<DiaChi> optional = diaChiRepository.findById(ma);
        Integer newTrangThai = diaChiKhachHangRequest.getTrangThai();
        Account account = accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }
        if (optional.isPresent()) {


            DiaChi diaChiToUpdate = optional.get();
            if (diaChiKhachHangRequest.getDiaChi() != null) {
                diaChiToUpdate.setDiaChi(diaChiKhachHangRequest.getDiaChi());
            }
            if (diaChiKhachHangRequest.getSoDienThoaiKhachHang() != null) {
                diaChiToUpdate.setSoDienThoaiKhachHang(diaChiKhachHangRequest.getSoDienThoaiKhachHang());
            }
            if (diaChiKhachHangRequest.getHoTenKH() != null) {
                diaChiToUpdate.setHoTenKH(diaChiKhachHangRequest.getHoTenKH());
            }
            if (diaChiKhachHangRequest.getTrangThai() != null) {
                diaChiToUpdate.setTrangThai(newTrangThai);
            }
            if (diaChiKhachHangRequest.getAccount() != null) {
                diaChiToUpdate.setAccount(accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElse(null));
            }
            if (diaChiKhachHangRequest.getTinhThanhPho() != null) {
                diaChiToUpdate.setTinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho());
            }
            if (diaChiKhachHangRequest.getXaPhuong() != null) {
                diaChiToUpdate.setXaPhuong(diaChiKhachHangRequest.getXaPhuong());
            }
            if (diaChiKhachHangRequest.getQuanHuyen() != null) {
                diaChiToUpdate.setQuanHuyen(diaChiKhachHangRequest.getQuanHuyen());
            }

            diaChiRepository.save(diaChiToUpdate);
            return diaChiToUpdate;
        }
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
        return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("\\p{InCombiningDiacriticalMarks}+", "").replaceAll("[^\\p{Alnum}]+", "");
    }

}
