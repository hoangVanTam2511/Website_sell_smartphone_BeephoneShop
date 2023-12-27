package beephone_shop_projects.core.admin.order_management.model.response;

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
public class PaymentMethodResponse {

  private String id;

  private String ma;

  private Integer loaiThanhToan;

  private Integer hinhThucThanhToan;

  private BigDecimal soTienThanhToan;

  private String ghiChu;

  private Date createdAt;

  private String createdBy;

  private Integer trangThai;

  private String nguoiXacNhan;

}
