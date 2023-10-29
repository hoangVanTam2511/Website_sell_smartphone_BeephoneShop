package beephone_shop_projects.core.admin.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {

  private String id;

  private String ma;

  private List<CartDetailsDto> cartItems;

}
