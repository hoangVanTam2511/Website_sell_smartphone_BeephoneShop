package beephone_shop_projects.core.admin.voucher_management.service.impl;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import beephone_shop_projects.entity.Voucher;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public Page<VoucherResponse> getAll(Pageable pageable) {
        return voucherRepository.getAllVoucher(pageable);
    }

    @Override
    public VoucherResponse getOne(String ma) {
        return voucherRepository.getOneVoucher(ma);
    }

    @Override
    public Voucher addVoucher(@Valid CreateVoucherRequest request) {

        Voucher voucher = Voucher.builder()
                .ma(request.getMa())
                .ten(request.getTen())
                .ngayBatDau(request.getNgayBatDau())
                .ngayKetThuc(request.getNgayKetThuc())
                .giaTriVoucher(request.getGiaTriVoucher())
                .trangThai(1)
                .build();
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(@Valid UpdateVoucherRequest request, String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        System.out.println(voucher);
        if (voucher != null) {
            voucher.setMa(request.getMa());
            voucher.setTen(request.getTen());
            voucher.setNgayBatDau(request.getNgayBatDau());
            voucher.setNgayKetThuc(request.getNgayKetThuc());
            voucher.setGiaTriVoucher(request.getGiaTriVoucher());
            voucher.setTrangThai(request.getTrangThai());
            return voucherRepository.save(voucher);
        }
        return null;
    }

    @Override
    public Boolean deleteVoucher(String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        if (voucher != null) {
            voucherRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Boolean doiTrangThai(String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        if (voucher != null){
            voucherRepository.doiTrangThai(id);
            return true;
        }
        return false;
    }

    @Override
    public Page<VoucherResponse> timKiemVoucher(FindVoucherRequest request) {
        Pageable pageable = PageRequest.of(request.getPageNo(), 5);
        Page<VoucherResponse> voucherResponses = voucherRepository.timKiemVoucher(
                                                                "%"+request.getMa()+"%",
                "%"+request.getTen() +"%",
                                                                request.getNgayBatDau(), request.getNgayKetThuc(),
                                                                "%"+request.getGiaTriVoucher()+"%", "%"+request.getTrangThai()+"%", pageable);
        return voucherResponses;
    }

}
