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

    private String matKhau;

    private String soDienThoai;

    private String xaPhuong;

    private String quanHuyen;

    private String canCuocCongDan;

    private String tinhThanhPho;

    private Boolean gioiTinh;

    private String anhDaiDien;

    private Integer trangThai;

    private String idRole;

}
