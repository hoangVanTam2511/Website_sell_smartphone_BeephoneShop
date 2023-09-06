package beephone_shop_projects.core.admin.account_management.model.request;

import lombok.Getter;
import lombok.Setter;

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
