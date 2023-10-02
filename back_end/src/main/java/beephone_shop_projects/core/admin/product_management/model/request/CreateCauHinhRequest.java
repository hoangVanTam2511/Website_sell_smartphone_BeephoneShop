package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateCauHinhRequest {

    private String mauSac;

    private Integer ram;

    private Integer rom;
}
