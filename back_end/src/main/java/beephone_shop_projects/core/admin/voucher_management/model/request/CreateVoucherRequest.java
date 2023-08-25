package beephone_shop_projects.core.admin.voucher_management.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class CreateVoucherRequest {

    @NotBlank(message = "Không để trống Tên !!!")
    private String ten;

    @NotNull(message = "Không để trống Điều Kiện Áp Dụng Voucher !!!")
    private BigDecimal dieuKienApDung;

    @NotNull(message = "Không để trống Số Lượng !!!")
    private Integer soLuong;

    @NotNull(message = "Không để trống Ngày Bắt Đầu !!!")
    @Past(message = "Không Được Chọn Ngày Nhỏ Hơn Ngày Hiện Tại !!!")
    private Date ngayBatDau;

    @NotNull(message = "Không để trống Ngày Kết Thúc !!!")
    private Date ngayKetThuc;

    @NotNull(message = "Không để trống giá trị Voucher !!!")
    @Min(value = 0, message = "Giá Trị Tối Thiểu Là 0 !!!")
    @Max(value = 100000, message = "Giá Trị Tối Đa là 100.000Đ")
    private BigDecimal giaTriVoucher;

}
