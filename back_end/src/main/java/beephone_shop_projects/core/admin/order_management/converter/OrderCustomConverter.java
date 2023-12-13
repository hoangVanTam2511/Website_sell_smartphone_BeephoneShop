package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.stereotype.Component;

@Component
public class OrderCustomConverter extends AbstractConverter<OrderCustomResponse, HoaDon, OrderRequest> {
}
