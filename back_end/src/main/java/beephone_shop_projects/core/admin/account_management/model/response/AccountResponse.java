package beephone_shop_projects.core.admin.account_management.model.response;

import beephone_shop_projects.entity.Account;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;
import java.util.Date;

@Projection(types = {Account.class})
public interface AccountResponse {
    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ho_va_ten}")
    String getHoVaTen();

    @Value("#{target.dia_chi}")
    String getDiaChi();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();
//    @Temporal(TemporalType.DATE)
    @Value("#{target.ngay_sinh}")
    LocalDate getNgaySinh();

}
