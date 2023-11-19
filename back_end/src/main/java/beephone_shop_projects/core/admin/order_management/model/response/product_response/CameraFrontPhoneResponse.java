package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CameraFrontPhoneResponse {

  private String id;

  private Boolean isCameraMain;

  private CameraFrontResponse cameraTruoc;

}
