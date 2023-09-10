package beephone_shop_projects.core.admin.promotion_management.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateKhuyenMaiChiTietRequest {

    @NotNull(message = "Đơn giá không được trống !!!")
    private BigDecimal donGia;

    @NotNull(message = "Đơn giá sau khuyến mãi không được trống !!!")
    private BigDecimal donGiaSauKhuyenMai;

    private String idSanPhamChiTiet;

    private String idKhuyenMai;
}
