package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Camera;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Camera.class})
public interface CameraResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.do_phan_giai}")
    String getDoPhanGiai();
}
