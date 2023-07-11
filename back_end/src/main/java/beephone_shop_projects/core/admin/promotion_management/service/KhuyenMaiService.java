package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.entity.KhuyenMai;
import jakarta.validation.Valid;

import java.util.List;

public interface KhuyenMaiService {

    List<KhuyenMaiResponse> getAll();

    KhuyenMaiResponse getOne(String ma);

    KhuyenMai addKhuyenMai(@Valid CreateKhuyenMaiRequest request);

    KhuyenMai updateKhuyenMai(@Valid UpdateKhuyenMaiRequest request, String ma);

    Boolean deleteVoucher(String ma);

}
