package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeSanPhamSapHetHang {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.path}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();
}
