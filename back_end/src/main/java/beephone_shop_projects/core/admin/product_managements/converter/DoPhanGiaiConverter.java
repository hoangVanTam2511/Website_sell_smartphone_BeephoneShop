package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;

import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import org.springframework.stereotype.Component;

@Component
public class DoPhanGiaiConverter extends AbstractConverter<DoPhanGiaiResponse, DoPhanGiaiManHinh, DoPhanGiaiRequest> {
}
