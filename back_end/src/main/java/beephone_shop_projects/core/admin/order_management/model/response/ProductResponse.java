package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductResponse {

  private String id;

  private String ma;

  private String tenSanPham;

  private OperatingType operatingType;

  private List<TheSim> theSims;

  private CongSac congSac;

  private String moTa;

  private Hang hang;

  private Chip chip;

  private ManHinh manHinh;

  private Pin pin;

  private Integer trangThai;

}
