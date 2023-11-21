package beephone_shop_projects.core.admin.order_management.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class SearchFilterOrderDto {

  private Integer currentPage;

  private Integer pageSize;

  private String keyword;

  @DateTimeFormat(pattern = "dd-MM-yyyy")
  private Date fromDate;

  @DateTimeFormat(pattern = "dd-MM-yyyy")
  private Date toDate;

  private Integer state;

  private Integer type;

  private String sort;

  private Boolean isPending;
}
