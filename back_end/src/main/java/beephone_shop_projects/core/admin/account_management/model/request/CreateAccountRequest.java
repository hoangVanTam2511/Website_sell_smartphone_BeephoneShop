package beephone_shop_projects.core.admin.account_management.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountRequest {

    private String ma;
    @NotBlank(message = "Họ tên trống")
    @Pattern(regexp = "^[a-zA-Z0-9 ]*$", message = "Họ và tên không được chứa ký tự đặc biệt")
    @Size(max = 30, message = "Họ tên không được vượt quá 30 ký tự")
    private String hoVaTen;

    @NotBlank(message = "Email trống")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "Email sai định dạng hoặc không phải là Gmail")
    private String email;

    @NotBlank(message = "Địa chỉ trống")
    @Size(min = 5, max = 255, message = "Địa chỉ phải có ít nhất 5 ký tự và không vượt quá 255 ký tự")
    private String diaChi;

    @NotBlank(message = "Số điện thoại trống")
    @Pattern(regexp = "^(?:\\+84|0)[1-9]\\d{8}$", message = "Số điện thoại không hợp lệ")
    private String soDienThoai;

    @NotNull(message = "Xã/Phường trống")
    private String xaPhuong;

    @NotNull(message = "Quận/Huyện trống")
    private String quanHuyen;

    @NotNull(message = "Căn cước công dân trống")
    private String canCuocCongDan;

    @NotNull(message = "Tỉnh/Thành phố trống")
    private String tinhThanhPho;

    @NotNull(message = "Ngày sinh trống")
    private String ngaySinh;

    private Boolean gioiTinh;

    private String matKhau;

    private String anhDaiDien;

    private Integer trangThai;

    private String idRole;

}
