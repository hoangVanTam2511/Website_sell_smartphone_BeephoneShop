package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.entity.DanhMuc;
import org.springframework.stereotype.Component;

@Component
public class DanhMucConverter extends AbstractConverter<DanhMucResponse, DanhMuc, DanhMucRequest> {
}
