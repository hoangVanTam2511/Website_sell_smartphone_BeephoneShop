package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.SearchAccountRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NhanVienService {
    Page<Account> getAllNV(Integer pageNo);
    Page<Account> getAll(SearchAccountRequest request);

    List<Account> getAllNVienNoPage();

    Account addNV(CreateAccountRequest request);

    void doiTrangThai(String id);

    Account updateNV(CreateAccountRequest request, String id);

    Page<Account> search(Optional<String> tenSearch, Integer pageNo);

    Account getOne(UUID id);

    Page<Account> filterTrangThai(StatusAccountCus trangThai, Integer pageableNo);

}
