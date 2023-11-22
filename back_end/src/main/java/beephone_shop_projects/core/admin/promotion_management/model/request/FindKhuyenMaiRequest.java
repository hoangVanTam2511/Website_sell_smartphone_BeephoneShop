package beephone_shop_projects.core.admin.promotion_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
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

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayKetThuc;

    private BigDecimal giaTriKhuyenMai;

    private StatusDiscount trangThai;

    private String keyword;

    private String sortType;

    private Integer pageNo;

    private Integer pageSize;
}
