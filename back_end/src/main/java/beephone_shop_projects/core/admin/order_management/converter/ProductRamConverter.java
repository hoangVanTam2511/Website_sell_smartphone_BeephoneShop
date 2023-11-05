package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.RamRequest;
import beephone_shop_projects.core.admin.order_management.model.response.RamResponse;
import beephone_shop_projects.entity.Ram;
import org.springframework.stereotype.Component;

@Component
public class ProductRamConverter extends AbstractConverter<RamResponse, Ram, RamRequest> {
}
