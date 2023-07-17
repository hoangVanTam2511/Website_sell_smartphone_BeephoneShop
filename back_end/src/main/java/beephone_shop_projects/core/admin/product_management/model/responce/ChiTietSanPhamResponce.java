package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.ChiTietSanPham;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {ChiTietSanPham.class, Ram.class, Rom.class, ManHinh.class, MauSac.class,
                     Chip.class, Pin.class, SanPham.class, HinhThucSanPham.class, DongSanPham.class,
                     Camera.class
                     })
public interface ChiTietSanPhamResponce {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_nha_san_xuat}")
    String getTenNhaSanXuat();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.hinh_thuc_san_pham}")
    Double getHinhThucSanPham();

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.dung_luong_pin}")
    Integer getDungLuongPin();

    @Value("#{target.ten_dong_san_pham}")
    String getTenDongSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();
}