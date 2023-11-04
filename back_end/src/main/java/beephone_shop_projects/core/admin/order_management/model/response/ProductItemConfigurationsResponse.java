package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemConfigurationsResponse {

  private String id;

  private String ma;

  private String tenSanPham;

  private List<ProductItemConfigurationResponse> productItems;

}
