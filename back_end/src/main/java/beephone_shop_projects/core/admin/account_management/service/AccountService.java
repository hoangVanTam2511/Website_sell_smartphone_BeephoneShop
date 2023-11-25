package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateNhanVienRequest;
import beephone_shop_projects.entity.Account;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface AccountService {
    Page<Account> getAll(Integer pageNo);
    Account addAcc(CreateNhanVienRequest request);
    Account getOneAcc(UUID id);

    Account updateAcc(CreateNhanVienRequest request, String id);
    Boolean deleteAcc(String id);
//    Page<Account> search(Optional<String> tenSearch,Integer pageNo);
}
