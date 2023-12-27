package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.infrastructure.constant.OrderType;
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
public class OrderDto {
  private String id;

  private String ma;

  private String ghiChu;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private BigDecimal tongTien;

  private OrderType loaiHoaDon;

  private Integer trangThai;

  private Date createdAt;

  private CartDto cart;

}
