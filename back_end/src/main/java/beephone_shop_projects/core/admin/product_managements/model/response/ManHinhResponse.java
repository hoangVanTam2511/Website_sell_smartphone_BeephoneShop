package beephone_shop_projects.core.admin.product_managements.model.response;

import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ManHinhResponse {

    private String id;

    private String ma;

    private Double kichThuoc;

    private String loaiManHinh;

    private Integer tanSoQuet;

    private StatusCommon status;

    private DoPhanGiaiResponse doPhanGiaiManHinh;

    private Date createdAt;


}
