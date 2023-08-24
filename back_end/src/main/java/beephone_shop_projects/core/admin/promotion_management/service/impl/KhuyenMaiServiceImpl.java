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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.security.SecureRandom;
import java.util.List;

@Service
@Validated
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 10;
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;


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
        KhuyenMai khuyenMai = KhuyenMai.builder()
                .ma(generateRandomCode())
                .tenKhuyenMai(request.getTenKhuyenMai())
                .dieuKienGiamGia(request.getDieuKienGiamGia())
                .mucGiamGiaTheoPhanTram(request.getMucGiamGiaTheoPhanTram())
                .mucGiamGiaTheoSoTien(request.getMucGiamGiaTheoSoTien())
                .ngayBatDau(request.getNgayBatDau())
                .ngayKetThuc(request.getNgayKetThuc())
                .trangThai(true)
                .build();
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public KhuyenMai updateKhuyenMai(@Valid UpdateKhuyenMaiRequest request, String ma) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(ma).get();
        if (khuyenMai != null) {
//            khuyenMai.setMa(request.getMa());
            khuyenMai.setTenKhuyenMai(request.getTenKhuyenMai());
            khuyenMai.setNgayBatDau(request.getNgayBatDau());
            khuyenMai.setDieuKienGiamGia(request.getDieuKienGiamGia());
            khuyenMai.setNgayKetThuc(request.getNgayKetThuc());
            khuyenMai.setMucGiamGiaTheoPhanTram(request.getMucGiamGiaTheoPhanTram());
            khuyenMai.setMucGiamGiaTheoSoTien(request.getMucGiamGiaTheoSoTien());
            return khuyenMaiRepository.save(khuyenMai);
        } else {
            return null;
        }
    }

    @Override
    public Boolean deleteVoucher(String ma) {
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
