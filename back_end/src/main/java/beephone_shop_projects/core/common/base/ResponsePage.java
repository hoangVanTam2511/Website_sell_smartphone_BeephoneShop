package beephone_shop_projects.core.common.base;

import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePage<T> {

  private Integer code;
  private String message;
  private List<T> data;
  private long totalPages;
  private long totalElements;
  private PageableResponse pageable;

  public ResponsePage(Page<T> page) {
    this.code = HttpStatus.SUCCESS_CODE.getStatusCode();
    this.message = Message.SUCCESS.getMessage();
    this.data = page.getContent();
    this.totalPages = page.getTotalPages();
    this.totalElements = page.getTotalElements();
    this.pageable = new PageableResponse(page.getPageable().getPageNumber(),
            page.getPageable().getPageSize());
  }

}
