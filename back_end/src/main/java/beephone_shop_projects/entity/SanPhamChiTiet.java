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
import java.util.HashSet;
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

  private BigDecimal giaTriKhuyenMai;

  private BigDecimal donGiaSauKhuyenMai;

  private Integer trangThai;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_san_pham")
  @JsonIgnore
  private SanPham sanPham;

  @OneToMany(mappedBy = "sanPhamChiTiet")
  private Set<Imei> imeis;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_cau_hinh")
  private CauHinh cauHinh;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_ram")
  @JsonIgnore
  private Ram ram;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_rom")
  @JsonIgnore
  private Rom rom;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_mau_sac")
  @JsonIgnore
  private MauSac mauSac;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_image")
  @JsonIgnore
  private Image image;

//  @JsonIgnore
//  @OneToMany(mappedBy = "idSanPham")
//  private Set<KhuyenMaiChiTiet> promotions = new HashSet<>();

}
