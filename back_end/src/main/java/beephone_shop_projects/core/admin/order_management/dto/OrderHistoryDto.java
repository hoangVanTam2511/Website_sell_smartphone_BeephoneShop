package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderHistoryDto {

  private String thaoTac;

  private Integer loaiThaoTac;

  private String moTa;

  private Date createdAt;

  private OrderDto hoaDon;

}
