package beephone_shop_projects.core.admin.transaction_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

public interface TransactionResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.maHoaDon}")
    String getMaHoaDon();

    @Value("#{target.soTienThanhToan}")
    BigDecimal getSoTienThanhToan();

    @Value("#{target.loaiThanhToan}")
    Integer getLoaiThanhToan();

    @Value("#{target.hinhThucThanhToan}")
    Integer getHinhThucThanhToan();

    @Value("#{target.trangThai}")
    Integer getTrangThai();

    @Value("#{target.idHoaDon}")
    String getIdHoaDon();

    @Value("#{target.ngayTao}")
    Date getNgayTao();

    @Value("#{target.idNhanVien}")
    String getIdNhanVien();

}
