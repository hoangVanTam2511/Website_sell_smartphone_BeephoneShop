package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.model.request.CreateKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.model.response.AccountResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface KhachHangService {
    Page<AccountResponse> getAllKH(Integer pageNo);
//    Page<AccountResponse> searchAllKHang(Integer pageable);
    Account addKH(CreateKhachHangRequest request);
    Account getOne(UUID id);
    void doiTrangThai(String id);

    Account updateKH(CreateKhachHangRequest request, String id);
    Page<AccountResponse> search(Optional<String> tenSearch, Integer pageNo);
}
