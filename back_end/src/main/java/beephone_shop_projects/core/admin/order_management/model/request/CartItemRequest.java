package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CartItemRequest {

  private Integer amount;

  private BigDecimal price;

  private CartRequest cart;

  private ProductItemRequest productItem;

  private String id;

}
