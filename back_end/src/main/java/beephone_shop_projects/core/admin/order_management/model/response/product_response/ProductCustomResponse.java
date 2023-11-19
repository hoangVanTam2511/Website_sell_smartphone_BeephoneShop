package beephone_shop_projects.core.admin.order_management.model.response.product_response;

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
public class ProductCustomResponse {

  private String id;

  private String ma;

  private String tenSanPham;

  private OperatingType operatingType;

  private List<SimCardPhoneResponse> theSims;

  private ChargingPortResponse congSac;

  private String moTa;

  private BrandResponse hang;

  private ChipResponse chip;

  private ScreenResponse manHinh;

  private PinResponse pin;

  private MemoryStickResponse theNho;

  private List<CameraFrontPhoneResponse> cameraTruocs;

  private List<CameraRearPhoneResponse> cameraSaus;

  private Integer trangThai;

  private List<ProductItemCustomResponse> productItems;

}
