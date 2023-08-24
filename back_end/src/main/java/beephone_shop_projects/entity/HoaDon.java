package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

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

  private BigDecimal tongTien;

  private BigDecimal tienThua;

  private BigDecimal tongTienSauKhiGiam;

  private String ghiChu;

  private Integer loaiHoaDon;

  private Date ngayGiaoHang;

  private Date ngayNhanHang;

  private Date ngayThanhToan;

  private Date ngayMongMuonNhan;

  private Date ngayHenKhachNhan;

  private Integer trangThai;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_hinh_thuc_thanh_toan")
  private HinhThucThanhToan hinhThucThanhToan;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_khach_hang")
  private Account account;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_voucher")
  private Voucher voucher;

}
