package beephone_shop_projects.core.client.servies;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.entity.Account;

public interface AccountClientService {

    Account checkEmailAndPass(AccountLoginRequest accountLoginRequest);
}
