package beephone_shop_projects.core.admin.voucher_management.model.response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

public interface VoucherResponse {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.soLuong}")
    String getSoLuong();

    @Value("#{target.dieuKienApDung}")
    String getDieuKienApDung();

    @Value("#{target.ngayBatDau}")
    LocalDateTime getNgayBatDau();

    @Value("#{target.ngayKetThuc}")
    LocalDateTime getNgayKetThuc();

    @Value("#{target.giaTriVoucher}")
    BigDecimal getGiaTriVoucher();

    @Value("#{target.trangThai}")
    Integer getTrangThai();

}
