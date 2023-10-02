package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.entity.HinhThucThanhToan;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderDto {

  private Integer orderStatus;

  private OrderHistoryDto orderHistory;

  private OrderResponse orderResponse;

  private Boolean isDelivery;

  private HinhThucThanhToan paymentMethod;
}
