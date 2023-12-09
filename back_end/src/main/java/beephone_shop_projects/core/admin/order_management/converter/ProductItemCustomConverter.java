package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemCustomResponse;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.stereotype.Component;

@Component
public class ProductItemCustomConverter extends AbstractConverter<ProductItemCustomResponse, SanPhamChiTiet, ProductItemCustomRequest> {
}
