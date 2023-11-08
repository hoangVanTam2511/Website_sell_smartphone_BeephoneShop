package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.entity.Image;
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

  private String maCauHinh;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ColorResponse mauSac;

  private Image image;

  private RamResponse ram;

  private RomResponse rom;

  private List<ProductItemImeiResponse> imeis;

  private ProductResponse sanPham;


}
