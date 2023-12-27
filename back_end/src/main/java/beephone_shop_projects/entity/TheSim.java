package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.SimMultiple;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sim")
public class TheSim extends PrimaryEntity implements IsIdentified {

  private String ma;

  private String loaiTheSim;

  @Enumerated(EnumType.ORDINAL)
  private SimMultiple simMultiple;

  @Enumerated(EnumType.ORDINAL)
  private StatusCommon status;

}
