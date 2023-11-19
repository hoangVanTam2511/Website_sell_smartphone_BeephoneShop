package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.entity.Ram;
import org.springframework.data.domain.Page;

public interface RamService extends GenericService<RamResponse, RamRequest, String> {

    Page<RamResponse> findAllRam(FindFilterProductsRequest findFilterProductsRequest);

    Ram doiTrangThai(String id) throws Exception;

}
