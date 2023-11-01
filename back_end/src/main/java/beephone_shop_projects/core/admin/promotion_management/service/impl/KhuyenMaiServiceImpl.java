package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    //    @Scheduled(fixedRate = 5000, initialDelay = 30000)
    public List<KhuyenMai> updateStatusKhuyenMai() {
        Date dateTime = new Date();
        List<KhuyenMai> listToUpdate = new ArrayList<>();

        List<KhuyenMai> list = khuyenMaiRepository.checkToStartAfterAndStatus(dateTime, StatusDiscount.CHUA_DIEN_RA);
        List<KhuyenMai> list1 = khuyenMaiRepository.checkEndDateAndStatus(dateTime, StatusDiscount.NGUNG_HOAT_DONG);
        List<KhuyenMai> list3 = khuyenMaiRepository.checkToStartBeforDateNowAndStatus(dateTime, StatusDiscount.HOAT_DONG);
        List<KhuyenMai> list4 = khuyenMaiRepository.checkToStartBeforDateNowAndStatus(dateTime, StatusDiscount.DA_HUY);

        listToUpdate.addAll(list);
        listToUpdate.addAll(list1);
        listToUpdate.addAll(list3);
        listToUpdate.addAll(list4);

        for (KhuyenMai v : listToUpdate) {
            if (list.contains(v) && list4.contains(v)) {
                v.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
            }
            if (list1.contains(v)) {
                v.setTrangThai(StatusDiscount.NGUNG_HOAT_DONG);
            }
            if (list3.contains(v) && list4.contains(v)) {
                v.setTrangThai(StatusDiscount.HOAT_DONG);
            }
        }
        return khuyenMaiRepository.saveAll(listToUpdate);
    }

    @Override
    public Page<KhuyenMai> getAll(FindKhuyenMaiRequest request) {
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
        List<KhuyenMai> khuyenMaiList = khuyenMaiRepository.findNamePromotion(request.getTenKhuyenMai());

        if(!khuyenMaiList.isEmpty()){
            throw new RestApiException("Tên giảm giá đã tồn tại!");
        }
        StatusDiscount status = StatusDiscount.CHUA_DIEN_RA;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)) {
            status = StatusDiscount.HOAT_DONG;
        }
        if (request.getNgayBatDau().before(dateTime)) {
            status = StatusDiscount.NGUNG_HOAT_DONG;
        }
        if (request.getNgayKetThuc().after(dateTime)) {
            status = StatusDiscount.CHUA_DIEN_RA;
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
        List<KhuyenMai> khuyenMaiList = khuyenMaiRepository.findNamePromotion(request.getTenKhuyenMai());

        if(!khuyenMaiList.isEmpty()){
            throw new RestApiException("Tên giảm giá đã tồn tại!");
        }
        StatusDiscount status = StatusDiscount.CHUA_DIEN_RA;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)) {
            status = StatusDiscount.HOAT_DONG;
        }
        if (request.getNgayBatDau().before(dateTime)) {
            status = StatusDiscount.NGUNG_HOAT_DONG;
        }
        if (request.getNgayKetThuc().after(dateTime)) {
            status = StatusDiscount.CHUA_DIEN_RA;
        }
        if (khuyenMai != null) {
            khuyenMai.setTenKhuyenMai(request.getTenKhuyenMai());
            khuyenMai.setNgayBatDau(request.getNgayBatDau());
            khuyenMai.setNgayKetThuc(request.getNgayKetThuc());
            khuyenMai.setGiaTriKhuyenMai(request.getGiaTriKhuyenMai());
            khuyenMai.setLoaiKhuyenMai(request.getLoaiKhuyenMai());
            khuyenMai.setTrangThai(status);
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
    public KhuyenMai doiTrangThai(String id) {
        KhuyenMai findKhuyenMai = khuyenMaiRepository.findById(id).get();
        if (findKhuyenMai.getTrangThai() == StatusDiscount.HOAT_DONG || findKhuyenMai.getTrangThai() == StatusDiscount.CHUA_DIEN_RA) {
            findKhuyenMai.setTrangThai(StatusDiscount.DA_HUY);
        } else if (findKhuyenMai.getTrangThai() == StatusDiscount.DA_HUY) {
            if (findKhuyenMai.getNgayBatDau().after(new Date())) {
                findKhuyenMai.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
            } else if (findKhuyenMai.getNgayKetThuc().after(new Date())) {
                findKhuyenMai.setTrangThai(StatusDiscount.HOAT_DONG);
            }
        }
        return khuyenMaiRepository.save(findKhuyenMai);
    }
}
