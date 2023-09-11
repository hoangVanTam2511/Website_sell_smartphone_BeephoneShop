package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiChiTietResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import jakarta.validation.Valid;

import java.util.List;

public interface KhuyenMaiChiTietService {

//    List<KhuyenMaiChiTietResponse> getAll();

    KhuyenMaiChiTiet addKhuyenMaiChiTiet(@Valid CreateKhuyenMaiChiTietRequest request);

    KhuyenMaiChiTiet updateKhuyenMaiChiTiet(@Valid CreateKhuyenMaiChiTietRequest request, String ma);

//    Boolean deleteVoucher(String ma);
}
