package beephone_shop_projects.core.admin.promotion_management.model.reponse;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SanPhamChiTietKhuyenMaiResponseCustom {

    private String id;

    private String duongDan;

    private String tenSanPham;

    private String tenMauSac;

    private Integer kichThuocRam;

    private Integer kichThuocRom;

    private BigDecimal donGia;

    private Boolean delected;

    private List<KhuyenMaiChiTietResponse> khuyenMaiChiTietResponse;

    private Integer size;

    private BigDecimal giaTriKhuyenMai;

    private String idSanPham;

    private BigDecimal tong;
}
