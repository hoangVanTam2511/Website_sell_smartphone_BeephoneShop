package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreenResponse {

  private String id;

  private Double kichThuoc;

  private String loaiManHinh;

  private Integer tanSoQuet;

  private ResolutionResponse doPhanGiaiManHinh;

  private StatusCommon status;



}
