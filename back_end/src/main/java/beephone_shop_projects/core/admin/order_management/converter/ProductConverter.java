package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductResponse;
import beephone_shop_projects.entity.SanPham;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter extends AbstractConverter<ProductResponse, SanPham, ProductRequest> {
}
