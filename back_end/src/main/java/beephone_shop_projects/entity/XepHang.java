package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "xepHang")
public class XepHang extends PrimaryEntity implements IsIdentified {

  private String ma;

  private String ten;

  private BigDecimal dieuKienToiThieu;

  private BigDecimal dieuKienToiDa;

  private BigDecimal uuDai;

  @Enumerated(EnumType.ORDINAL)
  private StatusCommon status;

}
