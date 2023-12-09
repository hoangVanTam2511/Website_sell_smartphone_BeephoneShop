package beephone_shop_projects.core.admin.rank_management.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface RankResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.dieuKienToiThieu}")
    BigDecimal getDieuKienToiThieu();

    @Value("#{target.dieuKienToiDa}")
    BigDecimal getDieuKienToiDa();

    @Value("#{target.uuDai}")
    BigDecimal getUuDai();

    @Value("#{target.status}")
    Integer getStatus();

}
