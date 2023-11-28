package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ImeiProductRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImeiProductResponse;
import beephone_shop_projects.entity.Imei;
import org.springframework.stereotype.Component;

@Component
public class ImeiProductConverter extends AbstractConverter<ImeiProductResponse, Imei, ImeiProductRequest> {
}
