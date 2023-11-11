package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.entity.CameraSau;
import org.springframework.data.domain.Page;

public interface CameraSauService extends GenericService<CameraSauResponse, CameraSauRequest, String> {

    Page<CameraSauResponse> findAllCameraSau(FindFilterCamerasRequest filterCamerasRequest);

    CameraSau doiTrangThai(String id) throws Exception;
}
