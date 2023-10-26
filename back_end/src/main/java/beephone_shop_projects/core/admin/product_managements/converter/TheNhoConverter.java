package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.TheNhoRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheNhoResponse;
import beephone_shop_projects.entity.TheNho;
import org.springframework.stereotype.Component;

@Component
public class TheNhoConverter extends AbstractConverter<TheNhoResponse, TheNho, TheNhoRequest> {
}
