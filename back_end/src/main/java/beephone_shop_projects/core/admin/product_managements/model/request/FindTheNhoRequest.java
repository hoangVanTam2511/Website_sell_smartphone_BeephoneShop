package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindTheNhoRequest {

    private String ma;

    private String loaiTheNho;

    private Integer dungLuongToiDa;

}
