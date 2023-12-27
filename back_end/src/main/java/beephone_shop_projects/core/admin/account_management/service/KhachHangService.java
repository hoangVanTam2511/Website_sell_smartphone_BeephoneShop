package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.AddKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface KhachHangService {
    Page<AccountResponse> getAllKH(@Param("request") FindAccountRequest request);
    Page<Account> getAll(FindAccountRequest search);
//    Page<AccountResponse> searchAllKHang(Integer pageable);

    Account addKH(AddKhachHangRequest request);
    Account getOne(UUID id);
    void doiTrangThai(String id);

    Account updateKH(CreateKhachHangRequest request, String id);
    Page<AccountResponse> search(Optional<String> tenSearch, Integer pageNo);

    Boolean isPhoneNumberUnique(String phoneNumberToCheck);
}
