package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiChiTietResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiChiTietRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.entity.KhuyenMai;
import jakarta.validation.Valid;

import java.util.List;

public interface KhuyenMaiChiTietService {

    List<KhuyenMaiChiTietResponse> getAll();

    KhuyenMai addKhuyenMai(@Valid CreateKhuyenMaiChiTietRequest request);

    KhuyenMai updateKhuyenMai(@Valid CreateKhuyenMaiChiTietRequest request, String ma);

    Boolean deleteVoucher(String ma);
}
