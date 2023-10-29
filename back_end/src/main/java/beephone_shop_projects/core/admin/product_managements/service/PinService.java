package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.Pin;
import org.springframework.data.domain.Page;

public interface PinService extends GenericService<PinResponse, PinRequest, String> {

    Page<Pin> findAllPin();
}
