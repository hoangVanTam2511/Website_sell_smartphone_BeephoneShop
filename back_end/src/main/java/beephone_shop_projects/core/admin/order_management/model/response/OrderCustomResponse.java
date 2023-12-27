package beephone_shop_projects.core.admin.order_management.model.response;

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
public class OrderCustomResponse {

  private Long stt;

  private String id;

  private String ma;

  private BigDecimal tongTien;

  private BigDecimal tienThua;

  private BigDecimal tongTienSauKhiGiam;

  private BigDecimal phiShip;

  private String ghiChu;

  private BigDecimal tienKhachTra;

  private BigDecimal tienTraKhach;

  private BigDecimal khachCanTra;

  private BigDecimal tienTraHang;

  private OrderType loaiHoaDon;

  private OrderStatus trangThai;

  private String hoVaTen;

  private String soDienThoai;

  private String email;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private Date createdAt;

  private String maQrCode;

  private Date updatedAt;

  private String createdBy;

  private String updatedBy;

  private String tinhThanhPhoNguoiNhan;

  private String quanHuyenNguoiNhan;

  private String xaPhuongNguoiNhan;

  private AccountResponse account;

  private AccountResponse accountEmployee;

}
