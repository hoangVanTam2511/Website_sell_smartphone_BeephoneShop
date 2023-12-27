package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.entity.CameraTruoc;
import org.springframework.stereotype.Component;

@Component
public class CameraTruocConverter extends AbstractConverter<CameraTruocResponse, CameraTruoc, CameraTruocRequest> {
}
