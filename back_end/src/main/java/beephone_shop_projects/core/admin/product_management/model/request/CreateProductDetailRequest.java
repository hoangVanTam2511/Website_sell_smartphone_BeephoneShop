package beephone_shop_projects.core.admin.product_management.model.request;

// create beautiful code and become superheroes
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class CreateProductDetailRequest {

    private String idSanPham;

    private String id;

    private Integer soLuong;

    private BigDecimal donGia;

}
