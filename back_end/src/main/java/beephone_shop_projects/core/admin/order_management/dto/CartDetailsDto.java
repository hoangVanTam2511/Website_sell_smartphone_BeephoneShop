package beephone_shop_projects.core.admin.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDetailsDto {

  private String id;

  private Integer soLuong;

  private BigDecimal donGia;

  private Date createdAt;

  private ProductDetailsDto sanPhamChiTiet;

}
