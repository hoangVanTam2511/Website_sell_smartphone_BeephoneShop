package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {CameraSau.class})
public interface CameraRearResponce {

    @Value("#{target.do_phan_giai}")
    Integer getDoPhanGiai();

    @Value("#{target.is_camera_main}")
    Boolean getIsCameraMain();
}
