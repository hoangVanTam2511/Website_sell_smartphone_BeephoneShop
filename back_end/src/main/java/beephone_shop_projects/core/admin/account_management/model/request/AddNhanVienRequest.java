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
public class AddNhanVienRequest {
    private String ma;
    @NotBlank(message = "Họ tên trống")
    @Size(max = 30, message = "Họ tên không được vượt quá 30 ký tự")
    private String hoVaTen;

    @NotBlank(message = "Email trống")
    private String email;

    @NotBlank(message = "Số điện thoại trống")
    @Pattern(regexp = "^(?:\\+84|0)[1-9]\\d{8}$", message = "Số điện thoại không hợp lệ")
    private String soDienThoai;

    @NotNull(message = "Căn cước công dân trống")
    private String canCuocCongDan;

    @NotNull(message = "Ngày sinh trống")
    private String ngaySinh;

    private Boolean gioiTinh;

    private String matKhau;

    private String anhDaiDien;

    //    @Enumerated(EnumType.STRING)
    private StatusAccountCus trangThai;

    private String idRole;

    private List<DiaChiNhanVienRequest> diaChiList;
}
