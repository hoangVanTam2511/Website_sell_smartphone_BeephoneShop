package beephone_shop_projects.core.admin.product_management.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;

@Getter
@Setter
@ToString
public class CreateProductRequest {

    private String nameProduct;

    private String description;

    private String chip;

    private Integer pin;

    private BigDecimal display;

    private String productLine;

    private String brand;

    private String operatingSystem;

    private Integer sim;

    private String chargingPort;

    private ArrayList<String> cameraFront;

    private ArrayList<String> cameraAfter;

}
