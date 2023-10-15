package beephone_shop_projects.core.admin.product_management.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateCamera {

    String idCamera;

    @NotBlank(message = "Độ phân giải trống")
    String resolutionCamera;
}
