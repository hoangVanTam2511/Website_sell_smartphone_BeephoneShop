package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RomRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RomResponse;
import beephone_shop_projects.entity.Rom;
import org.springframework.data.domain.Page;

public interface RomService extends GenericService<RomResponse, RomRequest, String> {

    Page<RomResponse> findAllRom(FindFilterProductsRequest findFilterProductsRequest);

    Rom doiTrangThai(String id) throws Exception;

}
