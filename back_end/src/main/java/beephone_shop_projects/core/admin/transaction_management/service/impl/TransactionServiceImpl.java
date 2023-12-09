package beephone_shop_projects.core.admin.transaction_management.service.impl;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.core.admin.transaction_management.repository.TransactionRepository;
import beephone_shop_projects.core.admin.transaction_management.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Page<TransactionResponse> getAll(Integer pageNo, TransactionRequest request) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return transactionRepository.getAll(pageable, request);
    }
}
