package beephone_shop_projects.core.admin.account_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchAccountRequest {

    private String hoVaTen;

    private String ma;

    private String email;

    private String soDienThoai;

    private String diaChi;

    private String xaPhuong;

    private String quanHuyen;

    private StatusAccountCus trangThai;

    private String keyword;

    private Integer page;

    private Integer pageSize;

}
