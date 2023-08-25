package beephone_shop_projects.core.admin.promotion_management.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class CreateKhuyenMaiRequest {

//    @NotBlank
//    private String ma;

    @NotBlank(message = "Tên khuyến mãi không được để trống !!!")
    private String tenKhuyenMai;

    @NotNull(message = "Mức giảm giá theo phần trăm không được trống !!!")
    private BigDecimal mucGiamGiaTheoPhanTram;

    @NotNull(message = "Mức giảm giá theo số tiền không được trống !!!")
    private BigDecimal mucGiamGiaTheoSoTien;

    @NotNull(message = "Ngày bắt đầu không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    @NotBlank(message = "Điều kiện giảm giá không được trống !!!")
    private String dieuKienGiamGia;

    private Boolean trangThai;

}
