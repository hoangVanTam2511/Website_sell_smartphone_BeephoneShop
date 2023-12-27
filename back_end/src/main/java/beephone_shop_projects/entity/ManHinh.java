package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "man_hinh")
public class ManHinh extends PrimaryEntity implements IsIdentified {

  private String ma;

  private Double kichThuoc;

  private String loaiManHinh;

  private Integer tanSoQuet;

  @Enumerated(EnumType.ORDINAL)
  private StatusCommon status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_do_phan_giai_man_hinh")
  @JsonIgnore
  private DoPhanGiaiManHinh doPhanGiaiManHinh;

}
