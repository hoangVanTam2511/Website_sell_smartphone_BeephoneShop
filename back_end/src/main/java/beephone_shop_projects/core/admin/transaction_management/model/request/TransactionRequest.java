package beephone_shop_projects.core.admin.transaction_management.model.request;

import beephone_shop_projects.entity.HoaDon;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class TransactionRequest {

//    private String ma;
//
    private BigDecimal soTienThanhToan;

    private String maHoaDon;

    private Integer loaiThanhToan;

    private Integer hinhThucThanhToan;

    private Integer trangThai;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date ngayKetThuc;

    private String keyword;

    private String sortValue;

    private Integer pageNo;

    private Integer pageSize;

}
