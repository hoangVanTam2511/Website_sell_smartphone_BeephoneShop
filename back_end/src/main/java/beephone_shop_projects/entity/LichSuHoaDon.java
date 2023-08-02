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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "linh_su_hoa_don")
public class LincSuHoaDon extends PrimaryEntity implements IsIdentified {

  private String thaoTac;

  private Integer loaiThaoTac;

  private String moTa;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "hoa_don_id")
  private HoaDon hoaDon;

}
