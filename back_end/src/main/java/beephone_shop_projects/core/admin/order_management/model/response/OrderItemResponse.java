package beephone_shop_projects.core.admin.order_management.model.response;

import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemResponse;
import beephone_shop_projects.entity.ImeiDaBan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class OrderItemResponse {

  private String id;

  private BigDecimal donGia;

  private BigDecimal donGiaSauGiam;

  private Integer soLuong;

  private Integer trangThai;

  private BigDecimal thanhTien;

  private List<ImeiDaBan> imeisDaBan;

  private ProductItemResponse sanPhamChiTiet;

}
