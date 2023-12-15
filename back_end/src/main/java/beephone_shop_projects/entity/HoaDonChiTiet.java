package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.PrimaryEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hoa_don_chi_tiet")
public class HoaDonChiTiet extends PrimaryEntity implements Serializable {

  private BigDecimal donGia;

  private BigDecimal donGiaSauGiam;

  private Integer soLuong;

  private BigDecimal thanhTien;

  private Integer trangThai;

  @OneToMany(mappedBy = "hoaDonChiTiet")
  private Set<ImeiDaBan> imeisDaBan;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_chi_tiet_san_pham")
  @JsonIgnore
  private SanPhamChiTiet sanPhamChiTiet;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_hoa_don")
  @JsonIgnore
  private HoaDon hoaDon;

}
