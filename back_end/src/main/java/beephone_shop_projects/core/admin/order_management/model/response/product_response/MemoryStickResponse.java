package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemoryStickResponse {

  private String id;

  private String loaiTheNho;

  private Integer dungLuongToiDa;

  private StatusCommon status;


}
