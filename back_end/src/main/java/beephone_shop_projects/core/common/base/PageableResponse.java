package beephone_shop_projects.core.common.base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageableResponse {

  private Integer currentPage;
  private Integer pageSize;

}
