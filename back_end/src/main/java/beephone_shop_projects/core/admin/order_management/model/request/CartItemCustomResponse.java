package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.core.admin.order_management.model.response.product_response.ImeiNotSoldResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CartItemCustomResponse {

  private String id;

  private Integer soLuong;

  private BigDecimal donGia;

  private Date createdAt;

  private List<ImeiNotSoldResponse> imeisChuaBan;

  private ProductItemResponse sanPhamChiTiet;

}
