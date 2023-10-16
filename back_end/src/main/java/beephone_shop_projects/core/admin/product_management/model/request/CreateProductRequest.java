package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;

@Getter
@Setter
@ToString
public class CreateProductRequest {

    private String tenSanPham;

    private String moTa;

    private String chip;

    private Integer pin;

    private BigDecimal manHinh;

    private String dongSanPham;

    private String nhaSanXuat;

    private String heDieuHanh;

    private Integer sim;

    private String congSac;

    private ArrayList<String> cameraTruoc;

    private ArrayList<String> cameraSau;

}
