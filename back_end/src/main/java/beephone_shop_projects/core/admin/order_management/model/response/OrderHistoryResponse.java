package beephone_shop_projects.core.admin.order_management.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class OrderHistoryResponse {

  private String id;

  private Integer loaiThaoTac;

  private String thaoTac;

  private Date createdAt;

  private String createdBy;

  private String moTa;

}
