package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.TheNhoRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheNhoResponse;
import beephone_shop_projects.entity.TheNho;
import org.springframework.data.domain.Page;

public interface TheNhoService extends GenericService<TheNhoResponse, TheNhoRequest, String> {

    Page<TheNho> findAllTheNho();
}
