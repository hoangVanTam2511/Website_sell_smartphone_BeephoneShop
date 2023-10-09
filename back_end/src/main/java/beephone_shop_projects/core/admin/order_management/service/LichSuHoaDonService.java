package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.model.request.OrderHistoryRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderHistoryResponse;

import java.util.List;

public interface LichSuHoaDonService extends GenericService<OrderHistoryResponse, OrderHistoryRequest, String> {

  List<OrderHistoryResponse> getOrderHistoriesByOrderId(String id);

}
