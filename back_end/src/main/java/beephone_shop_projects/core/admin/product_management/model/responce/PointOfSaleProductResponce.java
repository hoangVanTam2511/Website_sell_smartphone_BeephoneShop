package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SanPhamChiTiet.class})
public interface PointOfSaleProductResponce {

    @Value("#{target.so_luong_ton_kho}")
    String getSoLuongTonKho();

    @Value("#{target.don_gia}")
    String getDonGia();

}
