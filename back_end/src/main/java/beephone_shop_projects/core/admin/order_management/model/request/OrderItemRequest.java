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
public class OrderItemRequest {

  private Integer amount;

  private BigDecimal price;

  private BigDecimal priceAfterDiscount;

  private OrderRequest order;

  private String user;

  private ProductItemRequest productItem;

  private String id;

  private List<ImeiCustomRequest> imeis;

  private String imei;

  private BigDecimal tongTienSauKhiGiam;

  private BigDecimal tongTien;

  private String tongTienString;

  private String ghiChu;

  private BigDecimal phuPhi;

}
