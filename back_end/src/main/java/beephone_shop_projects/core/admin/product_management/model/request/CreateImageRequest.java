package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateImageRequest {

    private String tenAnh;

    private String duongDan;

    private String idChiTietSanPham;

    private Boolean trangThai;
}
