package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.entity.CameraSau;
import org.springframework.data.domain.Page;

public interface CameraSauService extends GenericService<CameraSauResponse, CameraSauRequest, String> {

    Page<CameraSau> findAllCameraSau();
}
