package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
import beephone_shop_projects.entity.KhuyenMai;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Validated
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 10;
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    public List<KhuyenMai> updateStatusKhuyenMai() {
        Date dateTime = new Date();
        List<KhuyenMai> listToUpdate = new ArrayList<>();

        List<KhuyenMai> list = khuyenMaiRepository.checkToStartAfterAndStatus(dateTime, 3);
        List<KhuyenMai> list1 = khuyenMaiRepository.checkEndDateAndStatus(dateTime, 2);
        List<KhuyenMai> list3 = khuyenMaiRepository.checkToStartBeforDateNowAndStatus(dateTime, 1);

        listToUpdate.addAll(list);
        listToUpdate.addAll(list1);
        listToUpdate.addAll(list3);

        for (KhuyenMai v : listToUpdate) {
            if (list.contains(v)) {
                v.setTrangThai(3);
            }
            if (list1.contains(v)) {
                v.setTrangThai(2);
            }
            if (list3.contains(v)) {
                v.setTrangThai(1);
            }
        }
        return khuyenMaiRepository.saveAll(listToUpdate);
    }

    @Override
    public Page<KhuyenMai> getAll(FindKhuyenMaiRequest request) {
        if (request.getPageNo() == null){
            request.setPageNo(1);
        }
        if (request.getPageSize() == null){
            request.setPageSize(5);
        }
        if (request.getKeyword() == null){
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPageNo()-1, request.getPageSize());
        Page<KhuyenMai> page = khuyenMaiRepository.findAllKhuyenMai(pageable, request);
        updateStatusKhuyenMai();
        return page;
    }

    @Override
    public KhuyenMaiResponse getOne(String ma) {
        return khuyenMaiRepository.getOneKhuyenMai(ma);
    }

    public String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            code.append(randomChar);
        }
        return code.toString();
    }
    @Override
    public KhuyenMai addKhuyenMai(@Valid CreateKhuyenMaiRequest request) {
        Integer status = 0;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)){
            status = 1;
        }
        if (request.getNgayBatDau().before(dateTime)){
            status = 2;
        }
        if (request.getNgayKetThuc().after(dateTime)){
            status = 3;
        }
        KhuyenMai khuyenMai = KhuyenMai.builder()
                .ma(generateRandomCode())
                .tenKhuyenMai(request.getTenKhuyenMai())
                .giaTriKhuyenMai(request.getGiaTriKhuyenMai())
                .loaiKhuyenMai(request.getLoaiKhuyenMai())
                .ngayBatDau(request.getNgayBatDau())
                .ngayKetThuc(request.getNgayKetThuc())
                .trangThai(status)
                .build();
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public KhuyenMai updateKhuyenMai(@Valid UpdateKhuyenMaiRequest request, String ma) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(ma).get();
        if (khuyenMai != null) {
            khuyenMai.setTenKhuyenMai(request.getTenKhuyenMai());
            khuyenMai.setNgayBatDau(request.getNgayBatDau());
            khuyenMai.setNgayKetThuc(request.getNgayKetThuc());
            khuyenMai.setGiaTriKhuyenMai(request.getGiaTriKhuyenMai());
            khuyenMai.setLoaiKhuyenMai(request.getLoaiKhuyenMai());
            return khuyenMaiRepository.save(khuyenMai);
        } else {
            return null;
        }
    }

    @Override
    public Boolean deleteKhuyenMai(String ma) {
        KhuyenMai findKhuyenMai = khuyenMaiRepository.findById(ma).get();
        if (findKhuyenMai != null) {
            khuyenMaiRepository.deleteById(ma);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean doiTrangThai(String id) {
        KhuyenMai findKhuyenMai = khuyenMaiRepository.findById(id).get();
        if (findKhuyenMai != null) {
            khuyenMaiRepository.doiTrangThai(id);
            return true;
        } else {
            return false;
        }
    }
}
