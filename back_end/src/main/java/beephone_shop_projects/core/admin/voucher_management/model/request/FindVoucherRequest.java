package beephone_shop_projects.core.admin.voucher_management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FindVoucherRequest {

    private String ma;

    private String ten;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private BigDecimal giaTriVoucher;

    private Integer trangThai;

    private Integer pageNo = 0;
}
