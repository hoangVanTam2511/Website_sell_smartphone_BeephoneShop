package beephone_shop_projects.core.admin.account_management.model.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter

public class CreateKhachHangRequest {

    private String ma;

    private UUID id;

    @NotBlank(message = "Họ và tên trống")
    private String hoVaTen;

    private String email;
    @NotBlank(message = "Ngày sinh trống")

    private String ngaySinh;

    private String matKhau;

    private String soDienThoai;

    private String canCuocCongDan;

    private Boolean gioiTinh;

    private String anhDaiDien;

    private Integer trangThai;

    private String idRole;

    private List<DiaChiKhachHangRequest> diaChiList;

}
