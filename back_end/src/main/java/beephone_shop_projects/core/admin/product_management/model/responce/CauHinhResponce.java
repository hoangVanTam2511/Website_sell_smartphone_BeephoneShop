package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = { Ram.class, Rom.class, ManHinh.class,
        Pin.class})
public interface CauHinhResponce {


    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.dung_luong_pin}")
    Integer getDungLuongPin();

    @Value("#{target.kich_thuoc_man_hinh}")
    Integer getKichThuocManHinh();

    @Value("#{target.mau_sac}")
    String getMauSac();

    @Value(("#{target.id}"))
    String getId();
}
