package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProvinceApi {

  private Integer code;

  private String message;

  private List<ProvinceDto> data;

}
