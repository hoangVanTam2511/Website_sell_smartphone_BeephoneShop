package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hinh_thuc_thanh_toan")
public class HinhThucThanhToan extends PrimaryEntity implements IsIdentified {

  private String ma;

  private Integer loaiThanhToan;

  private Integer hinhThucThanhToan;

  private BigDecimal soTienThanhToan;

  private String ghiChu;

  private Integer trangThai;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_hoa_don")
  private HoaDon hoaDon;

}
