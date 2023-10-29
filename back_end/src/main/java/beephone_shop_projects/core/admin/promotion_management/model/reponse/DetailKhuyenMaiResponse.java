package beephone_shop_projects.core.admin.promotion_management.model.reponse;

import org.springframework.beans.factory.annotation.Value;

public interface DetailKhuyenMaiResponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();

    @Value("#{target.id_san_pham}")
    String getIdSanPham();
}
