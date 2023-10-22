package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.entity.MauSac;
import org.springframework.data.domain.Page;

public interface MauSacService extends GenericService<MauSacResponse, MauSacRequest, String> {

    Page<MauSac> findAllMauSac();
}
