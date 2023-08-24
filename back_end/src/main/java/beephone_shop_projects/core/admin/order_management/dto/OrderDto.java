package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class OrderDto {

  private String id;

  private String ma;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private BigDecimal tongTien;

  private Integer loaiHoaDon;

  private Integer trangThai;

  private Date createdAt;

}
