package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeSanPhamKhoangNgay {
    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.ngay_tao}")
    String getNgayTao();

}
