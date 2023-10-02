package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.core.admin.order_management.model.response.CartResponse;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderRequest {

  private String id;

  private String ma;

  private BigDecimal tongTien;

  private BigDecimal tienThua;

  private BigDecimal tongTienSauKhiGiam;

  private BigDecimal tienKhachTra;

  private OrderType loaiHoaDon;

  private OrderStatus trangThai;

//  private String ghiChu;

//  private String tenNguoiNhan;
//
//  private String soDienThoaiNguoiNhan;
//
//  private String diaChiNguoiNhan;

  private Date createdAt;

//  private Date updatedAt;
//
//  private String createdBy;
//
//  private String updatedBy;

//  private AccountResponse account;

  private CartRequest cart;

//  private Set<PaymentMethodResponse> paymentMethods;

//  private Set<OrderItemRequest> orderItems;

//  private VoucherResponse voucher;

  private OrderHistoryRequest orderHistory;

}
