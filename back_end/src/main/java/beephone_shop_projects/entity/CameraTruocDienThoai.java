package beephone_shop_projects.entity;

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

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "camera_truoc_dien_thoai")
public class CameraTruocDienThoai extends PrimaryEntity implements Serializable {

  private Boolean isCameraMain;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_san_pham")
  private SanPham sanPham;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_camera_truoc")
  private CameraTruoc cameraTruoc;

}
