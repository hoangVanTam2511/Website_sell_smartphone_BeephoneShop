package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface CustomKhachHangRepository {
    Page<Account> findAllKH(Pageable pageable, FindAccountRequest request);

    Account getAccountById(String id);
}
