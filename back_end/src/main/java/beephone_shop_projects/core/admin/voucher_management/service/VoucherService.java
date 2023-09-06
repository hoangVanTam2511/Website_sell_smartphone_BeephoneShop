package beephone_shop_projects.core.admin.voucher_management.service;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

public interface VoucherService {

//    Page<VoucherResponse> getAll(Pageable pageable);

    VoucherResponse getOne(String id);

    Voucher addVoucher(@Valid CreateVoucherRequest request);

    Voucher updateVoucher(@Valid UpdateVoucherRequest request, String ma);

    Boolean deleteVoucher(String ma);

    Boolean doiTrangThai(String id);

    Page<Voucher> getAll(FindVoucherRequest request);


}
