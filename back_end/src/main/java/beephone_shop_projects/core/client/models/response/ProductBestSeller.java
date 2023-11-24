package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SanPhamChiTiet.class, SanPham.class, KhuyenMaiChiTiet.class})
public interface ProductBestSeller {

    @Value("#{target.so_luong_ban_ra}")
    String getSoLuongBanRa();

    @Value("#{target.id_chi_tiet_san_pham}")
    String getIdChiTietSanPham();
}
