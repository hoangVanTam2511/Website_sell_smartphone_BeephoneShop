package beephone_shop_projects.core.admin.rank_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateRankRequest {

    @Length(max = 10)
    private String ma;

    private StatusCommon status;

    @NotBlank
    @Length(max = 255)
    private String ten;

    @NotNull
    private BigDecimal dieuKienToiThieu;

    @NotNull
    private BigDecimal dieuKienToiDa;

    @NotNull
    private BigDecimal uuDai;

}
