package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CartDetailDto {

  private Integer amount;

  private BigDecimal price;

  private String cartId;

  private String productId;

  private String orderId;

}
