package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class CreateCameraDetail {

    String codeDetailCamera;

    ArrayList<String> idCameras;

    String idProduct;

    String typeCamera;

}
