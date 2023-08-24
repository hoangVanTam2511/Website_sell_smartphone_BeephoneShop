package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderDto {

  private Integer orderStatus;

  private OrderHistoryDto orderHistory;

}
