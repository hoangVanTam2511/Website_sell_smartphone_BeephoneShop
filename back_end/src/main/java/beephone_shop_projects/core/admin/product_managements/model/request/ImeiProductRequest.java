package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ImeiProductRequest {

    private String id;

    private String soImei;

    private String barcode;

    private SanPhamChiTiet sanPhamChiTiet;

    private StatusImei trangThai;

}
