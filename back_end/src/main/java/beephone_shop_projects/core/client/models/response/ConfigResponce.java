package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(name = "config", types = {Ram.class, Rom.class, MauSac.class, SanPhamChiTiet.class})
public interface ConfigResponce {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.don_gia_sau_khuyen_mai}")
    BigDecimal getDonGiaSauKhuyenMai();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.dung_luong_ram}")
    Integer getDungLuongRam();

    @Value("#{target.dung_luong_rom}")
    Integer getDungLuongRom();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.duong_dan}")
    String getDuongDan();

    @Value("#{target.so_luong_ton_kho}")
    Integer getSoLuongTonKho();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

}
