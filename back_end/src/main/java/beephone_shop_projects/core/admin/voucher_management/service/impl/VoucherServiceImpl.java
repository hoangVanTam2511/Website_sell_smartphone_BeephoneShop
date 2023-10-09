package beephone_shop_projects.core.admin.voucher_management.service.impl;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.CheckVoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import beephone_shop_projects.entity.Voucher;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Validated
@Component
public class    VoucherServiceImpl implements VoucherService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 7;

    @Autowired
    private VoucherRepository voucherRepository;

    //    @Scheduled(fixedRate = 5000, initialDelay = 30000)
    public List<Voucher> updateStatusVoucher() {
        Date dateTime = new Date();
        List<Voucher> listToUpdate = new ArrayList<>();

        List<Voucher> list = voucherRepository.checkToStartAfterAndStatus(dateTime, 3);
        List<Voucher> list1 = voucherRepository.checkEndDateAndStatus(dateTime, 2);
        List<Voucher> list3 = voucherRepository.checkToStartBeforDateNowAndStatus(dateTime, 1);
        List<Voucher> list4 = voucherRepository.checkToStartBeforDateNowAndStatus(dateTime, 4);

        listToUpdate.addAll(list);
        listToUpdate.addAll(list1);
        listToUpdate.addAll(list3);
        listToUpdate.addAll(list4);

        for (Voucher v : listToUpdate) {
            if (list.contains(v) && list4.contains(v)) {
                v.setTrangThai(3);
            }
            if (list1.contains(v)) {
                v.setTrangThai(2);
            }
            if (list3.contains(v) && list4.contains(v)) {
                v.setTrangThai(1);
            }
        }
        return voucherRepository.saveAll(listToUpdate);
    }

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
        Integer status = 0;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)) {
            status = 1;
        }
        if (request.getNgayBatDau().before(dateTime)) {
            status = 2;
        }
        if (request.getNgayKetThuc().after(dateTime)) {
            status = 3;
        }

        String codeVoucher = request.getMa().trim();
        if (request.getMa().isBlank()){
            codeVoucher = "BEE"+generateRandomCode();
        }
        if (voucherRepository.findCodeVoucher(request.getMa()) != null){
            // in ra lỗi trùng mã
        }
        Voucher voucher = Voucher.builder()
                .ma(codeVoucher)
                .ten(request.getTen().trim())
                .dieuKienApDung(request.getDieuKienApDung())
                .giaTriToiDa(request.getGiaTriToiDa())
                .loaiVoucher(request.getLoaiVoucher().trim())
                .soLuong(request.getSoLuong())
                .ngayBatDau(request.getNgayBatDau())
                .ngayKetThuc(request.getNgayKetThuc())
                .giaTriVoucher(request.getGiaTriVoucher())
                .trangThai(status)
                .build();
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(@Valid UpdateVoucherRequest request, String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        if (voucherRepository.findCodeVoucher(request.getMa()) != null){
            // in ra lỗi không tồn tại
        }
        if (voucher != null) {
            voucher.setMa(request.getMa().trim());
            voucher.setTen(request.getTen().trim());
            voucher.setGiaTriToiDa(request.getGiaTriToiDa());
            voucher.setLoaiVoucher(request.getLoaiVoucher().trim());
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
    public Voucher doiTrangThai(String id) {
        Voucher voucher = voucherRepository.findById(id).get();

        if (voucherRepository.findById(id) != null){
            // in ra lỗi
        }
        if (voucher.getTrangThai() == 1 || voucher.getTrangThai() == 3) {
            voucher.setTrangThai(4);
        } else if (voucher.getTrangThai() == 4) {
            if (voucher.getNgayBatDau().after(new Date())) {
                voucher.setTrangThai(3);
            } else if (voucher.getNgayKetThuc().after(new Date())) {
                voucher.setTrangThai(1);
            }
        }
        return voucherRepository.save(voucher);
    }

    @Override
    public Page<Voucher> getAll(FindVoucherRequest request) {
        if (request.getPageNo() == null) {
            request.setPageNo(1);
        }
        if (request.getPageSize() == null) {
            request.setPageSize(5);
        }
        if (request.getKeyword() == null) {
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize());
        Page<Voucher> vouchers = voucherRepository.findAll(pageable, request);
        updateStatusVoucher();
        return vouchers;
    }

    @Override
    public CheckVoucherResponse checkVoucher(String input, BigDecimal tongTien) {
        CheckVoucherResponse response = new CheckVoucherResponse();
        if (input == null || input.isBlank()) {
            return null;
        } else {
            VoucherResponse voucher = voucherRepository.findCodeVoucher(input);
            if (voucher != null) {
                if (!voucher.getMa().equals(input) || voucher.getTrangThai() != 1) {
                    response.setMessage("Mã giảm giá không tồn tại.");
                } else if (voucher.getMa().equals(input) && voucher.getSoLuong() <= 0) {
                    response.setMessage("Mã giảm giá đã hết lượt sử dụng.");
                } else if (tongTien.compareTo(voucher.getDieuKienApDung()) == -1){
                    response.setMessage("Đơn hàng không đủ điều kiện.");
                } else if (voucher.getMa().equals(input) && voucher.getSoLuong() > 0 && voucher.getTrangThai() == 1) {
                    response.setVoucher(voucher);
                    response.setStatus(true);
                }
                else {
                    response.setMessage("Mã giảm giá không tồn tại.");
                }
            } else {
                response.setMessage("Mã giảm giá không tồn tại.");
            }
        }
        return response;
    }

    @Override
    public Page<VoucherResponse> getVoucherStatusIsActive(FindVoucherRequest request) {
        if (request.getPageNo() == null) {
            request.setPageNo(1);
        }
        if (request.getPageSize() == null) {
            request.setPageSize(5);
        }
        if (request.getKeyword() == null) {
            request.setKeyword("");
        }
        Pageable pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize());
        return voucherRepository.getVoucherStatusIsActive(pageable, request);
    }
}
