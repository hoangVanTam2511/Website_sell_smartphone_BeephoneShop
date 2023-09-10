package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomVoucherRepository {
    Page<Voucher> findAll(Pageable pageable, FindVoucherRequest request);
}
