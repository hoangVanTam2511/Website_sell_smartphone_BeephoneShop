package beephone_shop_projects.core.admin.voucher_management.model.request;

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

@Getter
@Setter
public class UpdateVoucherRequest {

    private String ma;

    @NotBlank(message = "Không để trống Tên !!!")
    private String ten;

    private BigDecimal giaTriToiDa;

    @NotNull(message = "Không để trống Số Lượng !!!")
    private Integer soLuong;

    @Enumerated(EnumType.STRING)
    private TypeDiscount loaiVoucher;

    @NotNull(message = "Không để trống Điều Kiện Áp Dung")
    @Min(value = 0, message = "Giá Trị Tối Thiểu Là 0 !!!")
    private BigDecimal dieuKienApDung;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Không để trống Ngày Bắt Đầu !!!")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Không để trống Ngày Kết Thúc !!!")
    private Date ngayKetThuc;

    @NotNull(message = "Không để trống giá trị Voucher !!!")
    @Min(value = 0, message = "Giá Trị Tối Thiểu Là 0 !!!")
    @Max(value = 100000000, message = "Giá Trị Tối Đa là 100.000Đ")
    private BigDecimal giaTriVoucher;

}
