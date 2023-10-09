package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDto {

  private String id;

  private String ma;

  private String ten;

  private String heDieuHanh;

  private String sim;

  private String congSac;

  private String dongSanPham;

  private String chip;

  private String manHinh;

  private String pin;

}
