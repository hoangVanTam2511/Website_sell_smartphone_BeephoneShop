package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class CreateChiTietSanPhamRequest {

    private BigDecimal donGia;

    private String moTa;

    private Integer camera;

    private String chip;

    private String dongSanPham;

    private BigDecimal manHinh;

    private String mauSac;

    private BigDecimal hinhThucSanPham;

    private String nhaSanXuat;

    private Integer pin;

    private Integer ram;

    private Integer rom;

    private String sanPham;

}
