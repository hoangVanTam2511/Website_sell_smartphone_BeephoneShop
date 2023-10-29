package beephone_shop_projects.core.admin.voucher_management.model.response;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

public interface VoucherResponse {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.soLuong}")
    Integer getSoLuong();

    @Value("#{target.dieuKienApDung}")
    BigDecimal getDieuKienApDung();

    @Value("#{target.loaiVoucher}")
    Integer getLoaiVoucher();

    @Value("#{target.ngayBatDau}")
    Date getNgayBatDau();

    @Value("#{target.ngayKetThuc}")
    Date getNgayKetThuc();

    @Value("#{target.giaTriVoucher}")
    BigDecimal getGiaTriVoucher();

    @Value("#{target.giaTriToiDa}")
    BigDecimal getGiaTriToiDa();

    @Value("#{target.trangThai}")
    Integer getTrangThai();

}
