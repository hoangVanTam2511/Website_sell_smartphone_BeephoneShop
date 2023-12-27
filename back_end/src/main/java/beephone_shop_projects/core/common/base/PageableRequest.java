package beephone_shop_projects.core.common.base;

import beephone_shop_projects.infrastructure.constant.ConstantSystems;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageableRequest {

  private Integer currentPage = ConstantSystems.PaginationConstants.currentPage;
  private Integer pageSize = ConstantSystems.PaginationConstants.pageSize;

}
