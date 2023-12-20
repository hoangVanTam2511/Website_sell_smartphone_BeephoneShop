package beephone_shop_projects.core.client.models.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountChangeInformationRequest {

    String id;

    String name;

    Boolean gender;

    String email;

    String phoneNumber;

}
