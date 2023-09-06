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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "san_pham_chi_tiet")
public class SanPhamChiTiet extends PrimaryEntity  implements Serializable {

  private BigDecimal donGia;

  private Integer soLuongTonKho;

  private String ten;

  private String url;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_san_pham")
  private SanPham idSanPham;

}
