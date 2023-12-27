package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CartRequest {

  private String id;

  private String ma;

  private List<CartItemResponse> cartItems;

}
