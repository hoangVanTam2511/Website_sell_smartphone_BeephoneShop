package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.core.client.repositories.AccountClientRepository;
import beephone_shop_projects.core.client.serives.AccountClientService;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountClientServiceImpl implements AccountClientService {

    @Autowired
    private AccountClientRepository accountClientRepository;
    @Override
    public Account checkEmailAndPass(AccountLoginRequest accountLoginRequest) {
        return accountClientRepository.checkEmailAndPass(accountLoginRequest.getEmail(), accountLoginRequest.getPass());
    }
}
