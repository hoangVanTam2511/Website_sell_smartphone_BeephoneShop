package beephone_shop_projects.core.admin.order_management.model.response;

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
public class ProductItemConfigurationResponse {

  private String id;

  private String maCauHinh;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private ColorResponse mauSac;

  private RamResponse ram;

  private RomResponse rom;

  private List<ProductItemImeiResponse> imeis;

  private ProductResponse sanPham;

}
