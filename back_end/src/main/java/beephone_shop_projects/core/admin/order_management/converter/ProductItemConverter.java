package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.VoucherRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.Voucher;
import org.springframework.stereotype.Component;

@Component
public class ProductItemConverter extends AbstractConverter<ProductItemResponse, SanPhamChiTiet, ProductItemRequest> {
}
