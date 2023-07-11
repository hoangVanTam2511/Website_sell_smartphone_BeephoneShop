package beephone_shop_projects.core.admin.voucher_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

public interface VoucherResponse {

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.ngayBatDau}")
    Date getNgayBatDau();

    @Value("#{target.ngayKetThuc}")
    Date getNgayKetThuc();

    @Value("#{target.giaTriVoucher}")
    BigDecimal getGiaTri();

    @Value("#{target.trangThai}")
    Integer getTrangThai();

}
