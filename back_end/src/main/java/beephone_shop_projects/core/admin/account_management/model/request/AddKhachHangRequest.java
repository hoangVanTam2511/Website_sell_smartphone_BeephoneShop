package beephone_shop_projects.core.admin.account_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class AddKhachHangRequest {
    @NotBlank(message = "Họ tên trống")
    @Size(max = 30, message = "Họ tên không được vượt quá 30 ký tự")
    private String hoVaTen;

    @NotBlank(message = "Email trống")
    private String email;

    @NotNull(message = "Ngày sinh trống")
    private String ngaySinh;

    private String matKhau;
    @NotBlank(message = "Số điện thoại trống")
    private String soDienThoai;
    
    private String canCuocCongDan;

    private Boolean gioiTinh;

    private String anhDaiDien;

    private StatusAccountCus trangThai;

    private String idRole;

    private List<DiaChiKhachHangRequest> diaChiList;
}
