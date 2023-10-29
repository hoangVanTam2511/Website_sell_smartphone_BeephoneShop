package beephone_shop_projects.core.admin.promotion_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
public class UpdateKhuyenMaiRequest {

    @NotBlank(message = "Tên khuyến mãi không được để trống !!!")
    private String tenKhuyenMai;

    @NotNull(message = "Giá trị khuyến mãi không được để trống !!!")
    @Min(value = 0, message = "Giá Trị Tối Thiểu Là 0 !!!")
    @Max(value = 100000000, message = "Giá Trị Tối Đa là 100.000Đ")
    private BigDecimal giaTriKhuyenMai;

    @NotNull(message = "Loại khuyến mãi không được để trống !!!")
    @Enumerated(EnumType.STRING)
    private TypeDiscount loaiKhuyenMai;

    @NotNull(message = "Ngày bắt đầu không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    private StatusDiscount trangThai;

}
