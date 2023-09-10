package beephone_shop_projects.core.admin.promotion_management.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FindKhuyenMaiRequest {

    private String ma;

    private String tenKhuyenMai;

    private BigDecimal mucGiamGiaTheoPhanTram;

    private BigDecimal mucGiamGiaTheoSoTien;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayKetThuc;

    private String dieuKienGiamGia;

    private Integer trangThai;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;
}
