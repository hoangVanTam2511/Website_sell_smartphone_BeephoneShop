package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.PrimaryEntity;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "san_pham_chi_tiet")
public class SanPhamChiTiet extends PrimaryEntity implements Serializable {

  private String ma;

  private String maCauHinh;

  private BigDecimal donGia;

  private Integer soLuongTonKho;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_san_pham")
  private SanPham sanPham;

  @OneToMany(mappedBy = "sanPhamChiTiet")
  private Set<Imei> imeis;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_cau_hinh")
  private CauHinh cauHinh;

  @OneToMany(mappedBy = "sanPhamChiTiet")
  private Set<Anh> images = new HashSet<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_ram")
  private Ram ram;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_rom")
  private Rom rom;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_mau_sac")
  private MauSac mauSac;


}
