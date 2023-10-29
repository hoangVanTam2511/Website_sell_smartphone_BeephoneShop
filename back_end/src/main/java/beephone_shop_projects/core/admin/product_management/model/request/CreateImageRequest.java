package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateImageRequest {

    private String nameImage;

    private String urlImage;

    private String idProductDetail;

    private Boolean state;
}
