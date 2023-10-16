package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection( types = { MauSac.class })
public interface ColorResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value(("#{target.id}"))
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

}
