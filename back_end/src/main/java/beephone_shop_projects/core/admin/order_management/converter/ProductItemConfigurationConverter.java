package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemResponse;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.stereotype.Component;

@Component
public class ProductItemConfigurationConverter extends AbstractConverter<ProductItemConfigurationResponse, SanPhamChiTiet, ProductItemConfigurationRequest> {
}
