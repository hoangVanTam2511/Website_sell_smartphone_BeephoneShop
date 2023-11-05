package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiChiTietRepository;
import beephone_shop_projects.core.admin.promotion_management.repository.KhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.repository.SanPhamChiTietKhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiChiTietService;
import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.KhuyenMaiChiTietId;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
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
        KhuyenMaiChiTiet khuyenMaiList = khuyenMaiChiTietRepository.findSPKM(request.getIdKhuyenMai(), request.getIdSanPhamChiTiet());
        if (khuyenMaiList == null) {
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
        if (khuyenMaiList != null && khuyenMaiList.getDelected() == false) {
            khuyenMaiList.setDelected(true);
           return khuyenMaiChiTietRepository.save(khuyenMaiList);
        }
        return null;
    }

    @Override
    public KhuyenMaiChiTiet updateKhuyenMaiChiTiet(CreateKhuyenMaiChiTietRequest request, String ma) {
        return null;
    }

    @Override
    public void updateDelected(String id, String idSP) {
        khuyenMaiChiTietRepository.updateDelected(false, id, idSP);
    }

    public BigDecimal donGiaSauKhuyenMai(CreateKhuyenMaiChiTietRequest request) {
        Integer loaiKhuyenMai = khuyenMaiRepository.findById(request.getIdKhuyenMai()).get().getLoaiKhuyenMai().ordinal();
        BigDecimal giaTriKhuyenMai = khuyenMaiRepository.findById(request.getIdKhuyenMai()).get().getGiaTriKhuyenMai();
        BigDecimal donGia = sanPhamChiTietKhuyenMaiRepository.findById(request.getIdSanPhamChiTiet()).get().getDonGia();
        if (loaiKhuyenMai == TypeDiscount.VND.ordinal()) {
            return donGia.subtract(giaTriKhuyenMai);
        } else if (loaiKhuyenMai == TypeDiscount.PERCENT.ordinal()) {
            return donGia.subtract((donGia.multiply(giaTriKhuyenMai)).divide(new BigDecimal(100)));
        }
        return null;
    }
}
