package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.OrderItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.HoaDonChiTiet;
import org.springframework.stereotype.Component;

@Component
public class OrderItemConverter extends AbstractConverter<OrderItemResponse, HoaDonChiTiet, OrderItemRequest> {
}
