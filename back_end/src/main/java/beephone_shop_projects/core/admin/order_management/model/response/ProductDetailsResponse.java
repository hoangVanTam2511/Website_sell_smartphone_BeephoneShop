package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.dto.ConfigurationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailsResponse {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ProductResponse sanPham;

  private ConfigurationDto cauHinh;

}
