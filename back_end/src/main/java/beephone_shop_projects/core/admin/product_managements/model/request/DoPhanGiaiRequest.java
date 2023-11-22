package beephone_shop_projects.core.admin.product_managements.model.request;

import beephone_shop_projects.infrastructure.constant.ResolutionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DoPhanGiaiRequest {

    private  String id;

    private String ma;

    private Double chieuDai;

    private Double chieuRong;

    private ResolutionType resolutionType;

}
