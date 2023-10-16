package beephone_shop_projects.core.admin.order_management.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class OrderItemResponse {

  private String id;

  private BigDecimal donGia;

  private BigDecimal donGiaSauGiam;

  private Integer soLuong;

  private BigDecimal thanhTien;

  private ProductItemResponse sanPhamChiTiet;

}
