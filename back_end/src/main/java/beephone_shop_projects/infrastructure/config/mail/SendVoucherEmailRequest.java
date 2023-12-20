package beephone_shop_projects.infrastructure.config.mail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendVoucherEmailRequest {

    private String to;

    private String body;

    private String ma;

    private String ten;

    private Integer soLuong;

    private BigDecimal dieuKienApDung;

    private BigDecimal giaTriVoucher;

    private Date startTime;

    private Date endTime;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

}
