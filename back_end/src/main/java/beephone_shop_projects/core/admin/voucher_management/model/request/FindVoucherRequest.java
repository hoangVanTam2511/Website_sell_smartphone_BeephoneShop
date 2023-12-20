package beephone_shop_projects.core.admin.voucher_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date ngayKetThuc;

    private String dieuKienApDung;

    private String giaTriVoucher;

    private String giaTriToiDa;

    private Integer soLuong;

    private TypeDiscount loaiVoucher;

    private StatusDiscount trangThai;

    private String keyword;

    private String sortType;

    private Integer pageNo;

    private Integer pageSize;

    private BigDecimal tongTien;

}
