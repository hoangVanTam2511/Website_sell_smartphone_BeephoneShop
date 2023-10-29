package beephone_shop_projects.core.admin.promotion_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class CreateKhuyenMaiRequest {

    @NotBlank(message = "Tên khuyến mãi không được để trống !!!")
    @Length(max = 255)
    @Length(min = 5)
    private String tenKhuyenMai;

    @NotNull(message = "Giá trị khuyến mãi không được để trống !!!")
    @Min(value = 0)
    @Max(value = 100000000)
    private BigDecimal giaTriKhuyenMai;

    @NotNull(message = "Loại khuyến mãi không được để trống !!!")
    @Enumerated(EnumType.STRING)
    private TypeDiscount loaiKhuyenMai;

    @NotNull(message = "Ngày bắt đầu không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @FutureOrPresent
    private Date ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @FutureOrPresent
    private Date ngayKetThuc;

    private StatusDiscount trangThai;

}
