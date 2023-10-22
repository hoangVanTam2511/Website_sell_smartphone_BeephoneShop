package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.entity.Chip;
import org.springframework.stereotype.Component;

@Component
public class ChipConverter extends AbstractConverter<ChipResponse, Chip, ChipRequest> {
}
