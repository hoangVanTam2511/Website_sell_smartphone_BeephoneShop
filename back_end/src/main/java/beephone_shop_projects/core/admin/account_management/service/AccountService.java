package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.entity.Account;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountService {
    Page<Account> getAll(Integer pageNo);
    Account addAcc(CreateAccountRequest request);
    Account getOneAcc(UUID id);

    Account updateAcc(CreateAccountRequest request, String id);
    Boolean deleteAcc(String id);
//    Page<Account> search(Optional<String> tenSearch,Integer pageNo);
}
