package beephone_shop_projects.core.client.serives;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.entity.Account;

public interface AccountClientService {

    Account checkEmailAndPass(AccountLoginRequest accountLoginRequest);
}
