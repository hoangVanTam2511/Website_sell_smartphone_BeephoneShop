package beephone_shop_projects.core.admin.product_managements.model.response;

import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemResponse;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ImeiProductResponse {

    private String id;

    private String soImei;

    private StatusImei trangThai;

    private String barcode;

    private ProductItemResponse sanPhamChiTiet;

    private Date createdAt;

}
