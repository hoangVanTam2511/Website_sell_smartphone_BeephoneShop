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

import java.security.SecureRandom;
import java.time.LocalDate;

@Service
@Validated
public class VoucherServiceImpl implements VoucherService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 10;

    @Autowired
    private VoucherRepository voucherRepository;

//    @Override
//    public Page<VoucherResponse> getAll(Pageable pageable) {
//        return voucherRepository.getAllVoucher(pageable);
//    }

    @Override
    public VoucherResponse getOne(String id) {
        return voucherRepository.getOneVoucher(id);
    }

    public String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            code.append(randomChar);
        }
        return code.toString();
    }

    @Override
    public Voucher addVoucher(@Valid CreateVoucherRequest request) {
        Voucher voucher = Voucher.builder()
                .ma(generateRandomCode())
                .ten(request.getTen())
                .dieuKienApDung(request.getDieuKienApDung())
                .soLuong(request.getSoLuong())
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
            voucher.setTen(request.getTen());
            voucher.setDieuKienApDung(request.getDieuKienApDung());
            voucher.setSoLuong(request.getSoLuong());
            voucher.setNgayBatDau(request.getNgayBatDau());
            voucher.setNgayKetThuc(request.getNgayKetThuc());
            voucher.setGiaTriVoucher(request.getGiaTriVoucher());
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
        if (voucher != null) {
            voucherRepository.doiTrangThai(id);
            return true;
        }
        return false;
    }

    @Override
    public Page<Voucher> getAll(FindVoucherRequest request) {
        if (request.getPageNo() == null){
            request.setPageNo(1);
        }
        if (request.getPageSize() == null){
            request.setPageSize(5);
        }
        if (request.getKeyword() == null){
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize());
        Page<Voucher> vouchers = voucherRepository.findAll(pageable,request);
        return vouchers;
    }


}
