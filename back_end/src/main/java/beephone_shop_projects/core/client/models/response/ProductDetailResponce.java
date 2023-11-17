package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.*;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

@Projection(types = {SanPhamChiTiet.class, SanPham.class, KhuyenMaiChiTiet.class})
public interface ProductDetailResponce {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.don_gia_sau_khuyen_mai}")  
    BigDecimal getDonGiaSauKhuyenMai();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.dung_luong_ram}")
    Integer getDungLuongRam();

    @Value("#{target.dung_luong_rom}")
    Integer getDungLuongRom();

    @Value("#{target.duong_dan}")
    String getDuongDan();
}
