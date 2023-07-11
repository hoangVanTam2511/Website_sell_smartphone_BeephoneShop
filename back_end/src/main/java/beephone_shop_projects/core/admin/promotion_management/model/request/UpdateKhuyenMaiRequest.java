package beephone_shop_projects.core.admin.promotion_management.model.request;

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

    @NotBlank
    private String ma;

    @NotBlank
    private String tenKhuyenMai;

    @NotNull
    private BigDecimal mucGiamGiaTheoPhanTram;

    @NotNull
    private BigDecimal mucGiamGiaTheoSoTien;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    @NotBlank
    private String dieuKienGiamGia;

    private Boolean trangThai;

}
