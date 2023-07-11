package beephone_shop_projects.core.admin.account_management.model.request;

import beephone_shop_projects.entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateAccountRequest {

    private String ma;

    private String hoVaTen;

    private String email;

    private String ngaySinh;

    private String diaChi;

    private Integer trangThai;

    private String matKhau;

    private String soDienThoai;

    private String idRole;

}
