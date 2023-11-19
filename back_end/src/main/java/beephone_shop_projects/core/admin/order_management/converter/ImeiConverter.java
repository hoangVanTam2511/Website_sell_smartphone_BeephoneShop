package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ImeiCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ImeiResponse;
import beephone_shop_projects.entity.Imei;
import org.springframework.stereotype.Component;

@Component
public class ImeiConverter extends AbstractConverter<ImeiResponse, Imei, ImeiCustomRequest> {
}
