package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.entity.CameraSauDienThoai;
import beephone_shop_projects.entity.CameraTruocDienThoai;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.TheNho;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductRequest {

  private String ma;

  private String tenSanPham;

  private OperatingType operatingType;

  private List<TheSim> theSimDienThoais;

  private List<DanhMuc> danhMucs;

  private List<CameraSauDienThoai> cameraSauDienThoais;

  private List<CameraTruocDienThoai> cameraTruocDienThoais;

  private CongSac congSac;

  private String moTa;

  private Hang hang;

  private Chip chip;

  private TheNho theNho;

  private ManHinh manHinh;

  private Pin pin;

  private Integer trangThai;

}
