package beephone_shop_projects.core.admin.voucher_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class CreateVoucherRequest {

    private String ma;

    private StatusDiscount trangThai;

    @NotBlank
    @Length(max = 255)
    private String ten;

    private BigDecimal giaTriToiDa;

    @NotNull
    private Integer soLuong;

    @NotNull
    @Min(value = 0)
    @Max(value = 100000000)
    private BigDecimal dieuKienApDung;

    @Enumerated(EnumType.STRING)
    private TypeDiscount loaiVoucher;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @FutureOrPresent
    @NotNull
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @FutureOrPresent
    @NotNull
    private Date ngayKetThuc;

    @NotNull
    @Min(value = 0)
    @Max(value = 100000000)
    private BigDecimal giaTriVoucher;

}
