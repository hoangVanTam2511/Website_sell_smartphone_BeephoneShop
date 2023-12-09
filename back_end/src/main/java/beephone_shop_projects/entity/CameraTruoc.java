package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.CameraType;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "camera_truoc")
public class CameraTruoc extends PrimaryEntity implements IsIdentified {

  private String ma;

  private Integer doPhanGiai;

  @Enumerated(EnumType.ORDINAL)
  private CameraType cameraType;

  @Enumerated(EnumType.ORDINAL)
  private StatusCommon status;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_san_pham")
  private SanPham sanPham;

}
