package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.RomRequest;
import beephone_shop_projects.core.admin.order_management.model.response.RomResponse;
import beephone_shop_projects.entity.Rom;
import org.springframework.stereotype.Component;

@Component
public class ProductRomConverter extends AbstractConverter<RomResponse, Rom, RomRequest> {
}
