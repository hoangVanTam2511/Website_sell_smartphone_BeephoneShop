package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class CreateChiTietSanPhamRequest {

    private String tenSanPham;

    private String moTa;

    private String chip;

    private String dongSanPham;

    private String nhaSanXuat;

}
