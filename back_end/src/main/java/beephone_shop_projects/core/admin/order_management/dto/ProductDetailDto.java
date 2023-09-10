package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDetailDto {

  private String image;

  private String ma;

  private String ten;

  private BigDecimal gia;

}
