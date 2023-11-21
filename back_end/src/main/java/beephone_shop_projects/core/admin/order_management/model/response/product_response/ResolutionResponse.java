package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.ResolutionType;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResolutionResponse {

  private String id;

  private Double chieuDai;

  private Double chieuRong;

  private ResolutionType resolutionType;


}
