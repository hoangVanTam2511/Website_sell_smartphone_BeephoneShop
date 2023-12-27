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

    @Value("#{target.ten_hang}")
    String getTenHang();

    @Value("#{target.ten_dong_san_pham}")
    String getTenDongSanPham();

    @Value("#{target.ten_chip}")
    String getTenChip();

    @Value("#{target.kich_thuoc_man_hinh}")
    String getKichThuocManHinh();

    @Value("#{target.do_phan_giai_man_hinh}")
    String getDoPhanGiaiManHinh();

    @Value("#{target.he_dieu_hanh}")
    String getHeDieuHanh();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.cong_sac}")
    String getCongSac();

    @Value("#{target.sim}")
    String getSim();


    @Value("#{target.dung_luong_pin}")
    String getDungLuong();


    @Value("#{target.mo_ta}")
    String getMota();

    @Value("#{target.delected}")
    String getDelected();

}


