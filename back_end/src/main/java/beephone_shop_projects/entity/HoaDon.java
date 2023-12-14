package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hoa_don")
public class HoaDon extends PrimaryEntity implements IsIdentified {

  private String ma;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private String tinhThanhPhoNguoiNhan;

  private String quanHuyenNguoiNhan;

  private String xaPhuongNguoiNhan;

  private BigDecimal tongTien;

  private BigDecimal tienThua;

  private BigDecimal tongTienSauKhiGiam;

  private String ghiChu;

  private String hoVaTen;

  private String soDienThoai;

  private String email;

  private BigDecimal phiShip;

  private BigDecimal tienKhachTra;

  private BigDecimal khachCanTra;

  private BigDecimal tienTraKhach;

  private BigDecimal tienTraHang;

  @Column(length = 10000)
  private String maQrCode;

  @Enumerated(EnumType.ORDINAL)
  private OrderType loaiHoaDon;

  private Date ngayGiaoHang;

  private Date ngayNhanHang;

  private Date ngayThanhToan;

  private Date ngayMongMuonNhan;

  private Date ngayHenKhachNhan;

  @Enumerated(EnumType.ORDINAL)
  private OrderStatus trangThai;

  @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.REMOVE)
  private Set<HinhThucThanhToan> paymentMethods;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_khach_hang")
  @JsonIgnore
  private Account account;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_nhan_vien")
  @JsonIgnore
  private Account accountEmployee;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_voucher")
  @JsonIgnore
  private Voucher voucher;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "id_gio_hang")
  @JsonIgnore
  private GioHang cart;

  @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.REMOVE)
  private Set<LichSuHoaDon> orderHistories;

  @OneToMany(mappedBy = "hoaDon")
  private Set<HoaDonChiTiet> orderItems;

  public HoaDon(String ma, Account account) {
    this.ma = ma;
    this.account = account;
  }
}
