package beephone_shop_projects.core.admin.rank_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FindRankRequest {

    private String ma;

    private String ten;

    private BigDecimal dieuKienToiThieu;

    private BigDecimal dieuKienToiDa;

    private BigDecimal uuDai;

    private Integer status;

    private String sortType;

    private Integer pageSize;

}
