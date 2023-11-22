package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MauSacService extends GenericService<MauSacResponse, MauSacRequest, String> {

    Page<MauSacResponse> findAllMauSac(FindFilterProductsRequest findFilterProductsRequest);

    MauSac doiTrangThai(String id) throws Exception;

    List<MauSacResponse> searchMauSac(MauSacRequest mauSacRequest);
}
