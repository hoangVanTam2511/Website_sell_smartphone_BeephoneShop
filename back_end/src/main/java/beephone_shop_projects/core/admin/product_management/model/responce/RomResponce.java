package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Rom.class})
public interface RomResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value(("#{target.id}"))
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.kich_thuoc_rom}")
    String getKichThuocRom();


}
