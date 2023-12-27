package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class VoucherResponse {

  private String id;

  private String ma;

  private BigDecimal giaTriVoucher;

  private TypeDiscount loaiVoucher;

  private Integer soLuong;

  private BigDecimal giaTriToiDa;

  private BigDecimal dieuKienApDung;

}
