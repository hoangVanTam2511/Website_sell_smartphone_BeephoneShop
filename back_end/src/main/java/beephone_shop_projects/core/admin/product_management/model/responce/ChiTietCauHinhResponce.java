package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Camera;
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

@Projection(types = { Ram.class, Rom.class, ManHinh.class,
        Pin.class, HinhThucSanPham.class,
        Camera.class})
public interface ChiTietCauHinhResponce {

    @Value("#{target.hinh_thuc_san_pham}")
    Double getHinhThucSanPham();

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.dung_luong_pin}")
    Integer getDungLuongPin();
}
