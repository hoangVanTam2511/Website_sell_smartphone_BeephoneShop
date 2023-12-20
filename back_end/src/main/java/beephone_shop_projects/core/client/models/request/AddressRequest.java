package beephone_shop_projects.core.client.models.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {

    String id;

    String province;

    String district;

    String ward;

    String stress;
}
