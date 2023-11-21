package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ColorRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ColorResponse;
import beephone_shop_projects.entity.MauSac;
import org.springframework.stereotype.Component;

@Component
public class ProductColorConverter extends AbstractConverter<ColorResponse, MauSac, ColorRequest> {
}
