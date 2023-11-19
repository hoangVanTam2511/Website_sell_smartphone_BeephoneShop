package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.SimMultiple;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimCardResponse {

  private String id;

  private String loaiTheSim;

  private SimMultiple simMultiple;

  private StatusCommon status;


}
