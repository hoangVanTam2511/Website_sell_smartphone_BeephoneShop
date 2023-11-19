package beephone_shop_projects.core.admin.promotion_management.model.request;

import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeStatusPromotionRequest {

    private StatusDiscount status;

}
