package beephone_shop_projects.core.admin.account_management.model.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter

public class CreateKhachHangRequest {

    private String ma;

    private UUID id;

    @NotBlank(message = "Họ tên trống")
    @Pattern(regexp = "^[a-zA-Z0-9 ]*$", message = "Họ và tên không được chứa ký tự đặc biệt")
    @Size(max = 30, message = "Họ tên không được vượt quá 30 ký tự")
    private String hoVaTen;

    @NotBlank(message = "Email trống")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "Email sai định dạng hoặc không phải là Gmail")
    private String email;

    @NotBlank(message = "Ngày sinh trống")
    private String ngaySinh;

    private String matKhau;
    @NotBlank(message = "Số điện thoại trống")
    @Pattern(regexp = "^(?:\\+84|0)[1-9]\\d{8}$", message = "Số điện thoại không hợp lệ")

    private String soDienThoai;
    @NotNull(message = "Căn cước công dân trống")
    private String canCuocCongDan;

    private Boolean gioiTinh;

    private String anhDaiDien;

    private Integer trangThai;

    private String idRole;

    private List<DiaChiKhachHangRequest> diaChiList;

}
