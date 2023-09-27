package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Anh.class, MauSac.class})
public interface PointOfSaleColorResponce {

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.duong_dan}")
    String getDuongDan();
}
