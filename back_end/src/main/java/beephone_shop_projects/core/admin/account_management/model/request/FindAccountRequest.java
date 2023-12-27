package beephone_shop_projects.core.admin.account_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindAccountRequest {

    private String ma;

    private String hoVaTen;

    private String email;

    private String ngaySinh;

    private String soDienThoai;

    private StatusDiscount trangThai;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;
}
