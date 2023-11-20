package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RamResponse {

  private String id;

  private String ma;

  private Integer dungLuong;

  private StatusCommon status;

}
