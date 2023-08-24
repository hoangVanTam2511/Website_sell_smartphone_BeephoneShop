package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.LichSuHoaDon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderDto {
  private Integer orderStatus;

  private LichSuHoaDon orderHistory;

}
