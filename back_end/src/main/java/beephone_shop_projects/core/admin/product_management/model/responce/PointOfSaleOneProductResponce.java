package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SanPhamChiTiet.class, Anh.class})
public interface PointOfSaleOneProductResponce {


    @Value("#{target.ma_san_pham}")
    String getMaSanPham();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();
    @Value("#{target.duong_dan_anh}")
    String getDuongDanAnh();

    @Value("#{target.don_gia}")
    String getDonGia();

}
