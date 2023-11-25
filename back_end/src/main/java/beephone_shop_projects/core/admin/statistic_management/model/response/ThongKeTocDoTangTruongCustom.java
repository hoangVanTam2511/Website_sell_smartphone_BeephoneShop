package beephone_shop_projects.core.admin.statistic_management.model.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter

public class ThongKeTocDoTangTruongCustom {

    private BigDecimal doanhThuNgay;

    private BigDecimal tangTruongDoanhThuNgay;

    private BigDecimal doanhThuThang;

    private BigDecimal tangTruongDoanhThuThang;

    private BigDecimal doanhThuNam;

    private BigDecimal tangTruongDoanhThuNam;

    private Integer soSanPhamThang;

    private BigDecimal tangTruongSoSanPhamThang;

    private Integer soHoaDonNgay;

    private BigDecimal tangTruongSoHoaDonNgay;

    private Integer soHoaDonThang;

    private BigDecimal tangTruongSoHoaDonThang;

    private Integer soHoaDonNam;

    private BigDecimal tangTruongSoHoaDonNam;
}
