package beephone_shop_projects.core.client.models.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountRegisterRequest {

    private String name;

    @NotBlank(message = "Email trống")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "Email sai định dạng hoặc không phải là Gmail")
    private String email;

    private String password;

    @NotBlank(message = "Số điện thoại trống")
    @Pattern(regexp = "^(?:\\+84|0)[1-9]\\d{8}$", message = "Số điện thoại không hợp lệ")
    private String phone;
}
