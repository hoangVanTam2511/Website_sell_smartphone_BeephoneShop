package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.entity.CongSac;
import org.springframework.stereotype.Component;

@Component
public class CongSacConverter extends AbstractConverter<CongSacResponse, CongSac, CongSacRequest> {
}
