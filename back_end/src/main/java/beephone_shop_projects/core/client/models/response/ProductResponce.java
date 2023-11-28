package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SanPham.class, Chip.class, Hang.class, ManHinh.class, Pin.class})
public interface ProductResponce {

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_chip}")
    String getTenChip();

    @Value("#{target.ten_hang}")
    String getTenHang();

    @Value("#{target.loai_man_hinh}")
    String getLoaiManHinh();

    @Value("#{target.kich_thuoc_man_hinh}")
    String getKichThuocManHinh();

    @Value("#{target.loai_the_nho}")
    String getLoaiTheNho();

    @Value("#{target.dung_luong_pin}")
    String getDungLuongPin();

}
