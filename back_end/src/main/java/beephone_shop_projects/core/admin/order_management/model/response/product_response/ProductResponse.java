package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProductResponse {

  private String id;

  private String ma;

  private String tenSanPham;

  private OperatingType operatingType;

  private List<SimCardPhoneResponse> theSims;

  private List<CategoryPhoneResponse> danhMucs;

  private ChargingPortResponse congSac;

  private String moTa;

  private Date createdAt;

  private BrandResponse hang;

  private ChipResponse chip;

  private ScreenResponse manHinh;

  private PinResponse pin;

  private MemoryStickResponse theNho;

  private List<CameraFrontPhoneResponse> cameraTruocs;

  private List<CameraRearPhoneResponse> cameraSaus;

  private Integer trangThai;

}
