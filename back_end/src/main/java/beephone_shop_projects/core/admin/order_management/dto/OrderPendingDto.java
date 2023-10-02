package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderPendingDto {

  private String id;

  private String ma;

  private String ghiChu;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private BigDecimal tongTien;

  private Integer loaiHoaDon;

  private Integer trangThai;

  private Date createdAt;

  private CartDto gioHang;

  private Voucher voucher;

  private Account account;

  private HinhThucThanhToan hinhThucThanhToan;

  private List<LichSuHoaDon> orderHistories;

}
