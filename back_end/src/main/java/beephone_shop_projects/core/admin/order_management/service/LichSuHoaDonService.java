package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;

import java.util.List;

public interface LichSuHoaDonService extends GenericService<OrderHistoryDto, String> {

  List<OrderHistoryDto> getOrderHistoriesByOrderId(String id);

}
