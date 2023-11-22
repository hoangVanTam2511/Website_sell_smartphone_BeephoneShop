package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.entity.Hang;
import org.springframework.data.domain.Page;

public interface HangService extends GenericService<HangResponse, HangRequest, String> {

    Page<HangResponse> findAllHang(FindFilterProductsRequest findFilterProductsRequest);

    Hang doiTrangThai(String id) throws Exception;

}
