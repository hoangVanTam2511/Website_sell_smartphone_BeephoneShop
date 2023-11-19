package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.model.request.AccountRequest;
import beephone_shop_projects.core.admin.order_management.model.request.VoucherRequest;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponse {

  private String id;

  private String ma;

  private BigDecimal tongTien;

  private BigDecimal tienThua;

  private BigDecimal tongTienSauKhiGiam;

  private BigDecimal phiShip;

  private String ghiChu;

  private BigDecimal tienKhachTra;

  private OrderType loaiHoaDon;

  private OrderStatus trangThai;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private Date createdAt;

  private Date updatedAt;

  private String createdBy;

  private String updatedBy;

  private String tinhThanhPhoNguoiNhan;

  private String quanHuyenNguoiNhan;

  private String xaPhuongNguoiNhan;

  private AccountResponse account;

  private CartResponse cart;

  private List<PaymentMethodResponse> paymentMethods;

  private VoucherResponse voucher;

  private List<OrderHistoryResponse> orderHistories;

  private Set<OrderItemResponse> orderItems;

}
