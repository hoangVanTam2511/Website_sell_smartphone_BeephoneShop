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
public class VNPayRequest {

  private long total;

  private String code;

  private String info;

}
