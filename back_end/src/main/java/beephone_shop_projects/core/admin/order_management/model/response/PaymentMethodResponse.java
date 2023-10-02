package beephone_shop_projects.core.admin.order_management.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PaymentMethodResponse {

  private String id;

  private String ma;

  private Integer hinhThucThanhToan;

  private BigDecimal soTienThanhToan;

  private String ghiChu;

}
