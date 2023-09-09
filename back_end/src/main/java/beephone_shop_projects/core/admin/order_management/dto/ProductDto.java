package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDto {
  private String id;

  private BigDecimal donGia;

  private Integer soLuongTonKho;

  private String ten;

  private String url;

}
