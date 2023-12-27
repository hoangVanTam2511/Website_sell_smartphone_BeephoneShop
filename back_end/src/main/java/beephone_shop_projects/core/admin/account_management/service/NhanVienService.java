package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.AddNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateNhanVienRequest;
import beephone_shop_projects.core.admin.account_management.model.request.SearchAccountRequest;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NhanVienService {
    Page<Account> getAllNV(Integer pageNo);
    Page<Account> getAll(SearchAccountRequest request);

    List<Account> getAllNVienNoPage();

    Account addNV(AddNhanVienRequest request);

    void doiTrangThai(String id);

    Account updateNV(CreateNhanVienRequest request, String id);

    Page<Account> search(Optional<String> tenSearch,Integer acc, Integer pageNo);

    Account getOne(UUID id);

    Page<Account> filterTrangThai(StatusAccountCus trangThai, Integer pageableNo);
    Boolean isPhoneNumberUnique(String phoneNumberToCheck);
    Boolean isPhoneNumberUniqueCustomer(String phoneNumberToCheck);
    Boolean existsByCanCuocCongDan(String canCuoc);

}
