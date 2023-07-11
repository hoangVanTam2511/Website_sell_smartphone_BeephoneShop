package beephone_shop_projects.core.admin.voucher_management.model.request;

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

    @NotBlank(message = "Không để trống Mã !!!")
    private String ma;

    @NotBlank(message = "Không để trống Tên !!!")
    private String ten;

    @NotNull(message = "Không để trống Ngày Bắt Đầu !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;

    @NotNull(message = "Không để trống Ngày Kết Thúc !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    @NotNull(message = "Không để trống giá trị Voucher !!!")
    private BigDecimal giaTriVoucher;

    private Integer trangThai;

}
