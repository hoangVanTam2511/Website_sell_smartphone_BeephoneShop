package beephone_shop_projects.core.admin.account_management.model.response;

import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(types = {Account.class})
public interface AccountResponse {
    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.hoVaTen}")
    String getHoVaTen();

    @Value("#{target.diaChi}")
    String getDiaChi();

    @Value("#{target.soDienThoai}")
    String getSoDienThoai();

}
