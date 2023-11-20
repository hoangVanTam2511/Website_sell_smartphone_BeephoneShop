package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ImeiCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ImeiNotSoldResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ImeiResponse;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.ImeiChuaBan;
import org.springframework.stereotype.Component;

@Component
public class ImeiNotSoldConverter extends AbstractConverter<ImeiNotSoldResponse, ImeiChuaBan, ImeiCustomRequest> {
}
