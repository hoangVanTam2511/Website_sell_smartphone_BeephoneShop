package beephone_shop_projects.core.admin.statistic_management.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class ThongKeKhoangNgayDonHangRequest {

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date date1;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date date2;

}
