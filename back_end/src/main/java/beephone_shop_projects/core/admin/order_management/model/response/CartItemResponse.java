package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.dto.ProductDetailsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CartItemResponse {

  private String id;

  private Integer soLuong;

  private BigDecimal donGia;

  private Date createdAt;

  private ProductDetailsDto sanPhamChiTiet;

}
