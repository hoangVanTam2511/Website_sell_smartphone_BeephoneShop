package beephone_shop_projects.core.admin.order_management.model.response.product_response;

import beephone_shop_projects.entity.KhuyenMaiChiTiet;
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
public class ProductsItemResponse {

  private String id;

  private String ma;

  private Integer soLuongTonKho;

  private BigDecimal donGia;

  private BigDecimal donGiaSauKhuyenMai;

  private Integer trangThai;


}
