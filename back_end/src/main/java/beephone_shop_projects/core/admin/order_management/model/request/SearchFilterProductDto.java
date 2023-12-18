package beephone_shop_projects.core.admin.order_management.model.request;

import beephone_shop_projects.infrastructure.constant.OperatingType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class SearchFilterProductDto {

  private Integer state;

  private String sort;

  private Integer currentPage;

  private Integer pageSize;

  private String keyword;

  private List<String> danhMucs;

  private List<String> hangs;

  private List<OperatingType> heDieuHanhs;

  private List<String> chips;

  private List<String> manHinhs;

  private List<String> pins;

}
