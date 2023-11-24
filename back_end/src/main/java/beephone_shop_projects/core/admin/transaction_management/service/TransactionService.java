package beephone_shop_projects.core.admin.transaction_management.service;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.entity.HinhThucThanhToan;
import org.springframework.data.domain.Page;

public interface TransactionService {

    Page<TransactionResponse> getAll(Integer pageNo, TransactionRequest request);

}
