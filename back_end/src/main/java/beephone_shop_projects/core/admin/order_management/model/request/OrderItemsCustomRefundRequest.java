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
public class OrderItemsCustomRefundRequest {

  private List<OrderItemRefundRequest> orderItemRefunds;

  private Integer amount;

  private ImeiRefundCustomRequest imei;

  private BigDecimal tongTien;

  private String ghiChu;

  private BigDecimal phuPhi;

}
