package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface ThongKeDonHangKhoangNgay {

    @Value("#{target.soLuong}")
    Integer getSoLuong();

    @Value("#{target.tongTien}")
    Integer getTongTien();

    @Value("#{target.ngayTao}")
    Date getNgayTao();
}
