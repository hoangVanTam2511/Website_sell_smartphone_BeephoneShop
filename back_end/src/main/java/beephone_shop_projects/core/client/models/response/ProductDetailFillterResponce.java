package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {SanPhamChiTiet.class, SanPham.class, Ram.class, Rom.class, ManHinh.class, Chip.class, Hang.class, DanhMuc.class})
public interface ProductDetailFillterResponce {

    @Value("#{target.id_san_pham}")
    String getIdSanPham();

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();

    @Value("#{target.id_ram}")
    String getIdRam();

    @Value("#{target.id_rom}")
    String getIdRom();

    @Value("#{target.id_chip}")
    String getIdChip();

    @Value("#{target.tan_so_quet}")
    Integer getTanSoQuet();

    @Value("#{target.kich_thuoc}")
    Double getKichThuoc();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.don_gia_sau_khuyen_mai}")
    BigDecimal getDonGiaSauKhuyenMai();

    @Value("#{target.ten_hang}")
    String getTenHang();

    @Value("#{target.id_danh_muc}")
    String getIdDanhMuc();

}
