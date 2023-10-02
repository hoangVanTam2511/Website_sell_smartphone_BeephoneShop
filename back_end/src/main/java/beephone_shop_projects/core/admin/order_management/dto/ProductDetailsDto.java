package beephone_shop_projects.core.admin.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailsDto {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ProductDto sanPham;

  private ConfigurationDto cauHinh;


}
