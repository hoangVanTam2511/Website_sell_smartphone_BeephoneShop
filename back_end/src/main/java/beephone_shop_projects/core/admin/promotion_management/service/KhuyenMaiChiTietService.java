package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface KhuyenMaiChiTietService {

    KhuyenMaiChiTiet addKhuyenMaiChiTiet(@Valid CreateKhuyenMaiChiTietRequest request);

    KhuyenMaiChiTiet updateKhuyenMaiChiTiet(@Valid CreateKhuyenMaiChiTietRequest request, String ma);

    void updateDelected(String id, String idSP);

    void updateKhuyenMaiChiTiet(String id, String idSP);

    void updateSanPhamChiTiet(String id);
}
