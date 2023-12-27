package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "san_pham")
public class SanPham extends PrimaryEntity implements IsIdentified {

  private String ma;

  private String tenSanPham;

  @Enumerated(EnumType.ORDINAL)
  private OperatingType operatingType;

  @OneToMany(mappedBy = "sanPham")
  private Set<TheSimDienThoai> theSims;

  @OneToMany(mappedBy = "sanPham")
  private Set<DanhMucDienThoai> danhMucs;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_sac")
  private CongSac congSac;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_camera")
  private Camera camera;

  private String moTa;

//  private Integer trongLuong;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dong_san_pham")
  private DongSanPham dongSanPham;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_hang")
  private Hang hang;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_chip")
  private Chip chip;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_man_hinh")
  private ManHinh manHinh;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_the_nho")
  private TheNho theNho;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_pin")
  private Pin pin;

  @OneToMany(mappedBy = "sanPham")
  private Set<CameraTruocDienThoai> cameraTruocs;

  @OneToMany(mappedBy = "sanPham")
  private Set<CameraSauDienThoai> cameraSaus;

  @JsonIgnore
  @OneToMany(mappedBy = "sanPham")
  private List<SanPhamChiTiet> productItems = new ArrayList<>();

  private Integer trangThai;

}
