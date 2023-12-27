package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.entity.CameraTruoc;
import org.springframework.data.domain.Page;

public interface CameraTruocService extends GenericService<CameraTruocResponse, CameraTruocRequest, String> {

    Page<CameraTruocResponse> findAllCameraTruoc(FindFilterCamerasRequest filterCamerasRequest);

    CameraTruoc doiTrangThai(String id) throws Exception;

}
