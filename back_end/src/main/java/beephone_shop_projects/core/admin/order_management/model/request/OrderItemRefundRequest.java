package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class OrderItemRefundRequest {

  private Integer soLuong;

  private BigDecimal price;

  private BigDecimal priceAfterDiscount;

  private OrderRequest order;

  private ProductItemRequest productItem;

  private String id;

  private ImeiRefundCustomRequest imei;

  private BigDecimal tongTien;

  private String ghiChu;

  private BigDecimal phuPhi;

}
