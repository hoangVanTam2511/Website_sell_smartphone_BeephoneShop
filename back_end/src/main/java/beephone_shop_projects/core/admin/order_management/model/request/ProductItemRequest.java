package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.core.admin.order_management.dto.ConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ImageResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemRequest {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

}
