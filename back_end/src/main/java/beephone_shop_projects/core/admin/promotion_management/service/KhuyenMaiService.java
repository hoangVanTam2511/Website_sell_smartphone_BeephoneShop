package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.ChangeStatusPromotionRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.entity.KhuyenMai;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

public interface KhuyenMaiService {

    Page<KhuyenMai> getAll(FindKhuyenMaiRequest request);

    KhuyenMaiResponse getOne(String ma);

    KhuyenMai addKhuyenMai(@Valid CreateKhuyenMaiRequest request);

    KhuyenMai updateKhuyenMai(@Valid UpdateKhuyenMaiRequest request, String ma);

    Boolean deleteKhuyenMai(String ma);

    KhuyenMai doiTrangThai(ChangeStatusPromotionRequest request, String id);

    KhuyenMai kichHoatKhuyenMai(String id);

}
