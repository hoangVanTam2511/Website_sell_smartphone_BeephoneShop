package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.dto.ConfigurationResponse;
import beephone_shop_projects.entity.Anh;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemResponse {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ProductResponse sanPham;

  private ConfigurationResponse cauHinh;

  private List<ImageResponse> images;

}
