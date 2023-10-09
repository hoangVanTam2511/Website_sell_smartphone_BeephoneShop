package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.AccountRequest;
import beephone_shop_projects.core.admin.order_management.model.response.AccountResponse;
import beephone_shop_projects.entity.Account;
import org.springframework.stereotype.Component;

@Component
public class AccountConverter extends AbstractConverter<AccountResponse, Account, AccountRequest> {
}
