package beephone_shop_projects.core.admin.account_management.model.response;

import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Projection(types = {Account.class})
public interface AccountResponse {
    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.id}")
    String getID();

    @Value("#{target.mat_khau}")
    String getMatKhau();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.ho_va_ten}")
    String getHoVaTen();

    @Value("#{target.id_role}")
    String getIdRole();

    @Value("#{target.trang_thai}")
    Integer getTrangThai();

    @Value("#{target.anh_dai_dien}")
    String getAnhDaiDien();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();

    //    @Temporal(TemporalType.DATE)
    @Value("#{target.ngay_sinh}")
    LocalDate getNgaySinh();

    @DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    @Value("#{target.created_at}")
    Date getNgayTao();

}
