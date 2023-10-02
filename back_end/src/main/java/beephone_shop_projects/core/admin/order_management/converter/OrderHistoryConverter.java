package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.model.request.OrderHistoryRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderHistoryResponse;
import beephone_shop_projects.entity.LichSuHoaDon;
import org.springframework.stereotype.Component;

@Component
public class OrderHistoryConverter extends AbstractConverter<OrderHistoryResponse, LichSuHoaDon, OrderHistoryRequest> {
}
