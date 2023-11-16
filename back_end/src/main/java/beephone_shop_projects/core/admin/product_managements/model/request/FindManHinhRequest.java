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
public class FindManHinhRequest {

    private String ma;

    private Double kichThuoc;

    private String loaiManHinh;

    private Integer tanSoQuet;

    private String doPhanGiaiManHinh;

}
