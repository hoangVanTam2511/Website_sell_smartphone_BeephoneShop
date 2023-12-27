package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterImeisRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.ImeiProductRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImeiProductResponse;
import beephone_shop_projects.entity.Imei;
import org.springframework.data.domain.Page;

public interface ImeiProductService extends GenericService<ImeiProductResponse, ImeiProductRequest, String> {

    Imei getOneImei(String id);

    Page<ImeiProductResponse> findAllImei(FindFilterImeisRequest findFilterImeisRequest);

    Imei doiTrangThai(String id) throws Exception;

}
