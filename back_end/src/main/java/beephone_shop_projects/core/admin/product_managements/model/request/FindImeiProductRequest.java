package beephone_shop_projects.core.admin.product_managements.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindImeiProductRequest {

    private String id;

    private String soImei;

}
