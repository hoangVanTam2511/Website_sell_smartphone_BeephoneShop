package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.infrastructure.constant.StatusImei;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FindFilterImeisRequest {

    private Integer pageSize;

    private Integer currentPage;

    private String keyword;

    private StatusImei trangThai;

}
