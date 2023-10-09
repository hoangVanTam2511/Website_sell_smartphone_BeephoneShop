package beephone_shop_projects.core.admin.voucher_management.service;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.CheckVoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

public interface VoucherService {

    VoucherResponse getOne(String id);

    Voucher addVoucher(@Valid CreateVoucherRequest request);

    Voucher updateVoucher(@Valid UpdateVoucherRequest request, String ma);

    Boolean deleteVoucher(String ma);

    Voucher doiTrangThai(String id);

    Page<Voucher> getAll(FindVoucherRequest request);

    CheckVoucherResponse checkVoucher(String input, BigDecimal tongTien);

    Page<VoucherResponse> getVoucherStatusIsActive(FindVoucherRequest request);

}
