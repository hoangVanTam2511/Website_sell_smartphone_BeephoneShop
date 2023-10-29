package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Ram.class, Rom.class})
public interface PointOfSaleCofigResponce {

    @Value("#{target.ram}")
    Integer getRam();

    @Value("#{target.rom}")
    Integer getRom();

    @Value("#{target.don_gia}")
    Integer getDonGia();
}
