package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.entity.Pin;
import org.springframework.stereotype.Component;

@Component
public class PinConverter extends AbstractConverter<PinResponse, Pin, PinRequest> {
}
