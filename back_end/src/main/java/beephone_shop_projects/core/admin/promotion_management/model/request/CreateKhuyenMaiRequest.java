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

    @NotBlank(message = "Tên khuyến mãi không được để trống !!!")
    private String tenKhuyenMai;

    @NotNull(message = "Giá trị khuyến mãi không được để trống !!!")
    private BigDecimal giaTriKhuyenMai;

    @NotNull(message = "Loại khuyến mãi không được để trống !!!")
    private Integer loaiKhuyenMai;

    @NotNull(message = "Ngày bắt đầu không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được trống !!!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    private Integer trangThai;

}
