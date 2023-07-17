package beephone_shop_projects.core.admin.voucher_management.service;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import jakarta.validation.Valid;

import java.util.List;

public interface VoucherService {

    List<VoucherResponse> getAll(Integer page);

    VoucherResponse getOne(String ma);

    Voucher addVoucher(@Valid CreateVoucherRequest request);

    Voucher updateVoucher(@Valid UpdateVoucherRequest request, String ma);

    Boolean deleteVoucher(String ma);

}
