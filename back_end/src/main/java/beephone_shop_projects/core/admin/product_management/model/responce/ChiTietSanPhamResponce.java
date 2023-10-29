package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {SanPham.class, Ram.class, Rom.class, ManHinh.class, MauSac.class,
                     Chip.class, Pin.class, SanPham.class, DongSanPham.class
                     })
public interface ChiTietSanPhamResponce {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_nha_san_xuat}")
    String gettenHang();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

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

    @Value("#{target.delected}")
    Boolean getDelected();
}
