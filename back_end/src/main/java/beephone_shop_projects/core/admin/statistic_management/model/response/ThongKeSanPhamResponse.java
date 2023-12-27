package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ThongKeSanPhamResponse {

    @Value("#{target.so_luong}")
    Integer getSoLuong();


}
