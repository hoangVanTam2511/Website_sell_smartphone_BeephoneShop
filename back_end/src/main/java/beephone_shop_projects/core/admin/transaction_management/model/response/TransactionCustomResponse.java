package beephone_shop_projects.core.admin.transaction_management.model.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class TransactionCustomResponse {

    private String id;

    private String ma;

    private String maHoaDon;

    private BigDecimal soTienThanhToan;

    private Integer loaiThanhToan;

    private Integer hinhThucThanhToan;

    private Integer trangThai;

    private String idHoaDon;

    private Date ngayTao;

    private String nguoiXacNhan;

    private String idNhanVien;

}
