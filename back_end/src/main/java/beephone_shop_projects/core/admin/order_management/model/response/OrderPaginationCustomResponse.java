package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import jakarta.persistence.criteria.Selection;
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
public class OrderPaginationCustomResponse {

  private Long stt;

  private String id;

  private String ma;

  private String hoVaTen;

  private String soDienThoai;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String createdBy;

  private BigDecimal tongTien;

  private BigDecimal khachCanTra;

  private OrderType loaiHoaDon;

  private OrderStatus trangThai;

  private Date createdAt;

  private Account account;

  private Account accountEmployee;

  public OrderPaginationCustomResponse(String id, String ma) {
    this.id = id;
    this.ma = ma;
  }
}
