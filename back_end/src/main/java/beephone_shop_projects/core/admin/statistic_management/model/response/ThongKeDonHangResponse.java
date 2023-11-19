package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ThongKeDonHangResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.soLuong}")
    Integer getSoLuong();

    @Value("#{target.tongSoTien}")
    BigDecimal getTongTien();

}
