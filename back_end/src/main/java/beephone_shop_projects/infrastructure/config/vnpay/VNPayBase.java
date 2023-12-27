package beephone_shop_projects.infrastructure.config.vnpay;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VNPayBase {

  private String orderInfo;

  private String orderCode;

  private String paymentTime;

  private String transactionId;

  private BigDecimal totalPrice;

  private String content;

  private String status;

}
