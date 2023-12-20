package beephone_shop_projects.core.admin.transaction_management.service;

import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionCustomResponse;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.HinhThucThanhToan;
import org.springframework.data.domain.Page;

public interface TransactionService {

    ResponsePage<TransactionCustomResponse> getAll(TransactionRequest request);

}
