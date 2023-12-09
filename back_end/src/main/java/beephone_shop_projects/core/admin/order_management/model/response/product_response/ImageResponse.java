package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponse {

  private String id;

  private String path;

  private StatusCommon status;

}
