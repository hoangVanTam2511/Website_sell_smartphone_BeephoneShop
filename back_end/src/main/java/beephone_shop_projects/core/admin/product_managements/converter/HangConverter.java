package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.entity.Hang;
import org.springframework.stereotype.Component;

@Component
public class HangConverter extends AbstractConverter<HangResponse, Hang, HangRequest> {
}
