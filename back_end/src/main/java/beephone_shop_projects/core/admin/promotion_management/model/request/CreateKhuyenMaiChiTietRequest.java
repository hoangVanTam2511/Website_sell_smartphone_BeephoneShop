package beephone_shop_projects.core.admin.promotion_management.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateKhuyenMaiChiTietRequest {

//    @NotNull(message = "Đơn giá không được trống !!!")
//    private BigDecimal donGia;
//
//    @NotNull(message = "Đơn giá sau khuyến mãi không được trống !!!")
//    private BigDecimal donGiaSauKhuyenMai;

    @NotBlank
    private String idSanPhamChiTiet;
    @NotBlank
    private String idKhuyenMai;

}
