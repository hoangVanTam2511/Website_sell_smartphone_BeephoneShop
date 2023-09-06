package beephone_shop_projects.core.admin.promotion_management.model.reponse;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

public interface KhuyenMaiResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten_khuyen_mai}")
    String getTenKhuyenMai();

    @Value("#{target.muc_giam_gia_theo_phan_tram}")
    BigDecimal getMucGiamGiaTheoPhanTram();

    @Value("#{target.muc_giam_gia_theo_so_tien}")
    BigDecimal getMucGiamGiaTheoSoTien();

    @Value("#{target.ngay_bat_dau}")
    Date getNgayBatDau();

    @Value("#{target.ngay_ket_thuc}")
    Date getNgayKetThuc();

    @Value("#{target.dieu_kien_giam_gia}")
    String getDieuKienGiamGia();

    @Value("#{target.trang_thai}")
    Boolean getTrangThai();

}
