package beephone_shop_projects.core.admin.order_management.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CartResponse {

  private String id;

  private String ma;

  private List<CartItemResponse> cartItems;

}
