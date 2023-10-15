package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.ManHinh;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection( types = { ManHinh.class })
public interface DisplayResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value(("#{target.id}"))
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.do_phan_giai}")
    String getDoPhanGiai();

    @Value("#{target.kich_thuoc_man_hinh}")
    String getKichThuocManHinh();

}
