package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
import beephone_shop_projects.entity.KhuyenMai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public Page<KhuyenMaiResponse> getAll(Pageable pageable) {
        return khuyenMaiRepository.getAllKhuyenMai(pageable);
    }

    @Override
    public KhuyenMaiResponse getOne(String ma) {
        return khuyenMaiRepository.getOneKhuyenMai(ma);
    }

    @Override
    public KhuyenMai addKhuyenMai(CreateKhuyenMaiRequest request) {
        KhuyenMai khuyenMai = KhuyenMai.builder()
                .ma(request.getMa())
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
    public KhuyenMai updateKhuyenMai(UpdateKhuyenMaiRequest request, String ma) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(ma).get();
        if (khuyenMai != null) {
            khuyenMai.setMa(request.getMa());
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
