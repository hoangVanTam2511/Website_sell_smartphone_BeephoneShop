package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProductsResponse {

  private String id;

  private String ma;

  private String tenSanPham;

  private OperatingType operatingType;

  private String moTa;

  private Date createdAt;

  private Hang hang;

  private Integer trangThai;

  private Integer quantityInstock;

  private Integer quantityVersion;

  private String urlImage;

}
