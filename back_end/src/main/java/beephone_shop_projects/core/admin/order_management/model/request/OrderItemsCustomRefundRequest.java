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

  private String id;

  private List<OrderItemRefundRequest> orderItemRefunds;

  private Integer amount;

  private String productName;

  private ImeiRefundCustomRequest imei;

  private BigDecimal tongTien;

  private BigDecimal tongTienTraHang;

  private BigDecimal tongTienSauKhiTra;

  private String tongTienString;

  private String ghiChu;

  private BigDecimal phuPhi;

  private String createdByRefund;

  private VoucherRequest voucher;

}
