package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ColorRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ColorResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemImeiResponse;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.MauSac;
import org.springframework.stereotype.Component;

@Component
public class ProductImeiConverter extends AbstractConverter<ProductItemImeiResponse, Imei, ProductItemImeiRequest> {
}
