package beephone_shop_projects.core.admin.rank_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class UpdateRankRequest {

    private String ma;

    @NotBlank(message = "Không để trống Tên !!!")
    private String ten;

    @NotNull(message = "Không để trống Điều Kiện Tối Thiểu")
    private BigDecimal dieuKienToiThieu;

    @NotNull
    private BigDecimal dieuKienToiDa;

    @NotNull(message = "Không để trống ưu đãi !!!")
    private BigDecimal uuDai;

    private StatusCommon status;
}
