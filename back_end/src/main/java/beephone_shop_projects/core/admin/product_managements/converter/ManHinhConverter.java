package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.entity.ManHinh;
import org.springframework.stereotype.Component;

@Component
public class ManHinhConverter extends AbstractConverter<ManHinhResponse, ManHinh, ManHinhRequest> {
}
