package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(name = "config", types = {Ram.class, Rom.class, MauSac.class, SanPhamChiTiet.class, GioHangChiTiet.class, KhuyenMaiChiTiet.class})
public interface CartDetailResponce {

    @Value("#{target.id_gio_hang_chi_tiet}")
    String getIdGioHangChiTiet();

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();

    @Value("#{target.don_gia_sau_khuyen_mai}")
    BigDecimal getDonGiaSauKhuyenMai();

    @Value("#{target.so_luong_ton_kho}")
    Integer getSoLuongTonKho();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.dung_luong_ram}")
    Integer getDungLuongRam();

    @Value("#{target.dung_luong_rom}")
    Integer getDungLuongRom();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.so_luong_sap_mua}")
    Integer getSoLuongSapMua();

    @Value("#{target.duong_dan}")
    String getDuongDan();
}
