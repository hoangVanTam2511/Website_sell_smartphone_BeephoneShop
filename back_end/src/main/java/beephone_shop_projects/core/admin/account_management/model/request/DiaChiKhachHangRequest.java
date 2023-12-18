package beephone_shop_projects.core.admin.account_management.model.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class DiaChiKhachHangRequest {

    @NotBlank(message = "Họ tên trống")
    @Size(max = 30, message = "Họ tên không được vượt quá 30 ký tự")
    private String hoTenKH;

    @NotBlank(message = "Số điện thoại trống")
    @Pattern(regexp = "^(?:\\+84|0)[1-9]\\d{8}$", message = "Số điện thoại không hợp lệ")
    private String soDienThoaiKhachHang;

    @NotBlank(message = "Địa chỉ trống")
    @Size(min = 5, max = 255, message = "Địa chỉ phải có ít nhất 5 ký tự và không vượt quá 255 ký tự")
    private String diaChi;

    @NotNull(message = "Tỉnh/Thành phố trống")
    private String tinhThanhPho;

    @NotNull(message = "Quận/Huyện trống")
    private String quanHuyen;

    @NotNull(message = "Xã/Phường trống")
    private String xaPhuong;

    private String account;

    private String ma;

    private Integer trangThai;

}
