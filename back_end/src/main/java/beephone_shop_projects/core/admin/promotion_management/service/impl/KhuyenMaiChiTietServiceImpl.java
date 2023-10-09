package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiChiTietRepository;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.repository.SanPhamChiTietKhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiChiTietService;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.KhuyenMaiChiTietId;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;

@Service
@Validated
public class KhuyenMaiChiTietServiceImpl implements KhuyenMaiChiTietService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Autowired
    private SanPhamChiTietKhuyenMaiRepository sanPhamChiTietKhuyenMaiRepository;

    @Autowired
    private KhuyenMaiChiTietRepository khuyenMaiChiTietRepository;

    @Override
    public KhuyenMaiChiTiet addKhuyenMaiChiTiet(@Valid CreateKhuyenMaiChiTietRequest request) {
        KhuyenMaiChiTietId khuyenMaiChiTietId = KhuyenMaiChiTietId.builder()
                .idKhuyenMai(khuyenMaiRepository.findById(request.getIdKhuyenMai()).get())
                .idSanPham(sanPhamChiTietKhuyenMaiRepository.findById(request.getIdSanPhamChiTiet()).get())
                .build();
        KhuyenMaiChiTiet khuyenMaiChiTiet = KhuyenMaiChiTiet.builder()
                .khuyenMaiChiTietId(khuyenMaiChiTietId)
                .donGia(sanPhamChiTietKhuyenMaiRepository.findById(request.getIdSanPhamChiTiet()).get().getDonGia())
                .donGiaSauKhuyenMai(donGiaSauKhuyenMai(request))
                .build();
        return khuyenMaiChiTietRepository.save(khuyenMaiChiTiet);
    }

    @Override
    public KhuyenMaiChiTiet updateKhuyenMaiChiTiet(CreateKhuyenMaiChiTietRequest request, String ma) {

        return null;
    }

    @Override
    public Boolean deleteKhuyenMaiChiTiet(String ma) {
        return null;
    }

    public BigDecimal donGiaSauKhuyenMai(CreateKhuyenMaiChiTietRequest request) {
        String loaiKhuyenMai = khuyenMaiRepository.findById(request.getIdKhuyenMai()).get().getLoaiKhuyenMai();
        BigDecimal giaTriKhuyenMai = khuyenMaiRepository.findById(request.getIdKhuyenMai()).get().getGiaTriKhuyenMai();
        BigDecimal donGia = sanPhamChiTietKhuyenMaiRepository.findById(request.getIdSanPhamChiTiet()).get().getDonGia();
        if (loaiKhuyenMai.equals("VNĐ")) {
            return donGia.subtract(giaTriKhuyenMai);
        } else if (loaiKhuyenMai.equals("%")) {
            return donGia.subtract((donGia.multiply(giaTriKhuyenMai)).divide(new BigDecimal(100)));
        }
        return null;
    }
}
