package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemResponse;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.stereotype.Component;

@Component
public class ProductItemConverter extends AbstractConverter<ProductItemResponse, SanPhamChiTiet, ProductItemRequest> {
}
