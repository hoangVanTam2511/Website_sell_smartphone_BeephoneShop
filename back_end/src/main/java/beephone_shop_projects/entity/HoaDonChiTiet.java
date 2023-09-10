package beephone_shop_projects.entity;

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

import java.io.Serializable;
import java.math.BigDecimal;

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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_chi_tiet_san_pham")
  private SanPhamChiTiet sanPhamChiTiet;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_hoa_don")
  private HoaDon hoaDon;

}
