package beephone_shop_projects.core.admin.order_management.model.response;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RomResponse {

  private String id;

  private String ma;

  private Integer dungLuong;

}
