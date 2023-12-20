package beephone_shop_projects.core.admin.transaction_management.controller;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.service.TransactionService;
import beephone_shop_projects.core.common.base.ResponsePage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
@CrossOrigin("*")
public class TransactionRestController {
    @Autowired
    private TransactionService transactionService;


    @GetMapping("/transactions")
    public ResponsePage hienThiTransaction(final TransactionRequest request) {
        return transactionService.getAll(request);
    }


}
