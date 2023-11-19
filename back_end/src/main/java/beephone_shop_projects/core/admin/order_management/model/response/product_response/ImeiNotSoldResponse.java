package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.StatusImei;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImeiNotSoldResponse {
  private String id;

  private String soImei;

//  private String barcode;
//
  private StatusImei trangThai;

}
