package beephone_shop_projects.core.admin.voucher_management.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckVoucherResponse {

    private VoucherResponse voucher;

    private String message;

    private Boolean status;
}
