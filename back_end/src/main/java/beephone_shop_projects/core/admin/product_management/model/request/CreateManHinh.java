package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateManHinh {

    private String mamanHinh;

    private BigDecimal tenmanHinh;
}
