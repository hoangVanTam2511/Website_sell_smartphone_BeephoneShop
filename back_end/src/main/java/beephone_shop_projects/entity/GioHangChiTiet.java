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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gio_hang_chi_tiet")
public class GioHangChiTiet extends PrimaryEntity implements Serializable {

  private Integer soLuong;

  private BigDecimal donGia;

  @OneToMany(mappedBy = "gioHangChiTiet")
  private Set<ImeiChuaBan> imeisChuaBan;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_gio_hang")
  @JsonIgnore
  private GioHang gioHang;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_chi_tiet_san_pham")
  @JsonIgnore
  private SanPhamChiTiet sanPhamChiTiet;

}
