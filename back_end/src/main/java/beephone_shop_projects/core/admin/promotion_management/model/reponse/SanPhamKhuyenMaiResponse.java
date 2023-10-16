package beephone_shop_projects.core.admin.promotion_management.model.reponse;


import org.springframework.beans.factory.annotation.Value;

public interface SanPhamKhuyenMaiResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMaSanPham();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.delected}")
    String getDelected();

    @Value("#{target.id_dong_san_pham}")
    String getIdDongSanPham();

    @Value("#{target.ten_dong_san_pham}")
    String getTenDongSanPham();

}
