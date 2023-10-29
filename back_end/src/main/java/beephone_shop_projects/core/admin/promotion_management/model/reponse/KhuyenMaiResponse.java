package beephone_shop_projects.core.admin.promotion_management.model.reponse;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Value("#{target.gia_tri_khuyen_mai}")
    BigDecimal getGiaTriKhuyenMai();

    @Value("#{target.loai_khuyen_mai}")
    Integer getLoaiKhuyenMai();

    @Value("#{target.ngay_bat_dau}")
    Date getNgayBatDau();

    @Value("#{target.ngay_ket_thuc}")
    Date getNgayKetThuc();

    @Value("#{target.trang_thai}")
    Integer getTrangThai();

}
