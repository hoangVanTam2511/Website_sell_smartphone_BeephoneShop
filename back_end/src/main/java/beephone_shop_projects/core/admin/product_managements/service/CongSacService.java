package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.entity.CongSac;
import org.springframework.data.domain.Page;

public interface CongSacService extends GenericService<CongSacResponse, CongSacRequest, String> {

    Page<CongSac> findAllCongSac();

    CongSac updateCongSac(CongSacRequest congSacRequest, String id) throws Exception;

    CongSac doiTrangThai(String id) throws Exception;

}
