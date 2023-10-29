package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.DongSanPham;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection( types = {DongSanPham.class })
public interface ProductLineResponce {

    @Value("#{target.stt}")
    String getStt();

    @Value(("#{target.id}"))
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten_dong_san_pham}")
    String getTenDongSanPham();

}
