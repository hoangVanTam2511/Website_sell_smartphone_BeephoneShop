package beephone_shop_projects.core.client.models.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class AccountLoginRequest {

    @NotBlank(message = "Email trống")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "Email sai định dạng hoặc không phải là Gmail")
    private String email;

    private char[] password;
}
