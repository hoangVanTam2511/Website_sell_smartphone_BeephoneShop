package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.infrastructure.constant.CameraType;
import beephone_shop_projects.infrastructure.constant.ConstantSystems;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CameraSauRequest extends ConstantSystems.PaginationConstants {

    private String id;

    private String ma;

    private Integer doPhanGiai;

    private CameraType cameraType;

    private StatusCommon status;

    private Date createdAt;

}
