package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ThongKeSanPhamBanChayResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.path}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.dung_luong_ram}")
    Integer getDungLuongRam();

    @Value("#{target.dung_luong_rom}")
    Integer getDungLuongRom();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

}
