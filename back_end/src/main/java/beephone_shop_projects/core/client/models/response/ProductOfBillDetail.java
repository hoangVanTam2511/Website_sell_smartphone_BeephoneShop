package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {HoaDonChiTiet.class, SanPham.class, Ram.class, Rom.class, MauSac.class})
public interface ProductOfBillDetail {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.don_gia_sau_giam}")
    BigDecimal getDonGiaSauGiam();

    @Value("#{target.ram}")
    Integer getRam();

    @Value("#{target.rom}")
    Integer getRom();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.duong_dan}")
    String getDuongDan();
}
