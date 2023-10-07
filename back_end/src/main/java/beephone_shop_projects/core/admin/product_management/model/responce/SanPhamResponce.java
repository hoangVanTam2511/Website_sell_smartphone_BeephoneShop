package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SanPham.class, Ram.class, Rom.class, ManHinh.class, MauSac.class,
        Chip.class, Pin.class, SanPham.class, DongSanPham.class
})
public interface SanPhamResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_nha_san_xuat}")
    String getTenNhaSanXuat();

    @Value("#{target.ten_dong_san_pham}")
    String getTenDongSanPham();

    @Value("#{target.ten_chip}")
    String getTenChip();

    @Value("#{target.delected}")
    String getDelected();
}
