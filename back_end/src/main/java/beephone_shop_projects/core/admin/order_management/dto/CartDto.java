package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.GioHangChiTiet;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartDto {

  private String id;

  private String ma;

  private List<GioHangChiTiet> cartDetails;

}
