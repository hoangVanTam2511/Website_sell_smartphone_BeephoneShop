package beephone_shop_projects.core.admin.order_management.model.request;

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
public class ProductItemImeiRequest {

  private String imei;

  private Date createdAt;

  private StatusImei trangThai;

  private String barcode;

}
