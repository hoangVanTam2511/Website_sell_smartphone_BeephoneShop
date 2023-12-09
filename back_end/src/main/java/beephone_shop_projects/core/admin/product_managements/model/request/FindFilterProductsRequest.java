package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.infrastructure.constant.CameraType;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FindFilterProductsRequest {

    private Integer pageSize;

    private Integer currentPage;

    private String keyword;

    private StatusCommon status;

}
