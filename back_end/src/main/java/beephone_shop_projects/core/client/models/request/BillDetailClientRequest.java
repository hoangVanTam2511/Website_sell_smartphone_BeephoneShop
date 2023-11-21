package beephone_shop_projects.core.client.models.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BillDetailClientRequest {

    private String idSanPhamChiTiet;

    private String idHoaDon;

    private BigDecimal donGia;

    private BigDecimal donGiaSauKhiGiam;

    private Integer soLuong;

    private BigDecimal thanhTien;

    private String idKhachHang;
}
