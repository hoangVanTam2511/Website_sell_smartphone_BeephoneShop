package beephone_shop_projects.core.admin.voucher_management.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FindVoucherRequest {

    private String ma;

    private String ten;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayKetThuc;

    private BigDecimal DieuKienApDung;

    private Integer soLuong;

    private BigDecimal giaTriVoucher;

    private Integer trangThai;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;

}
