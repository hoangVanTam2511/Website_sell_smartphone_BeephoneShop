package beephone_shop_projects.infrastructure.config.vnpay;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VNPayRequestCustom {

  private BigDecimal total;

  private String info;

  private String code;

  private String paymentTime;

  private String transactionId;

  private String transactionStatus;

  private String personConfirm;

}
