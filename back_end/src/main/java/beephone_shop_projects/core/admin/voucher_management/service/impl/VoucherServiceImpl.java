package beephone_shop_projects.core.admin.voucher_management.service.impl;

import beephone_shop_projects.core.admin.voucher_management.model.request.ChangeStatusVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.CheckVoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.repository.VoucherRepository;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import beephone_shop_projects.infrastructure.constant.TypeDiscount;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
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
public class VoucherServiceImpl implements VoucherService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 7;

    @Autowired
    private VoucherRepository voucherRepository;

//    @Scheduled(fixedRate = 5000, initialDelay = 30000)
    public List<Voucher> updateStatusVoucher() {
        Date dateTime = new Date();
        List<Voucher> listToUpdate = new ArrayList<>();

        List<Voucher> list = voucherRepository.checkToStartAfterAndStatus(dateTime, StatusDiscount.CHUA_DIEN_RA);
        List<Voucher> list1 = voucherRepository.checkEndDateAndStatus(dateTime, StatusDiscount.NGUNG_HOAT_DONG);
        List<Voucher> list3 = voucherRepository.checkToStartBeforDateNowAndStatus(dateTime, StatusDiscount.HOAT_DONG);
        List<Voucher> list4 = voucherRepository.checkToStartBeforDateNowAndStatus(dateTime, StatusDiscount.DA_HUY);
        List<Voucher> list5 = voucherRepository.checkToStartBeforDateNowAndStatus(dateTime, StatusDiscount.TAM_DUNG);

        listToUpdate.addAll(list);
        listToUpdate.addAll(list1);
        listToUpdate.addAll(list3);
        listToUpdate.addAll(list4);
        listToUpdate.addAll(list5);


        for (Voucher v : listToUpdate) {
            if (list.contains(v) && list4.contains(v) && list5.contains(v)) {
                v.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
            }
            if (list1.contains(v)) {
                v.setTrangThai(StatusDiscount.NGUNG_HOAT_DONG);
            }
            if (list3.contains(v) && list4.contains(v) && list5.contains(v)) {
                v.setTrangThai(StatusDiscount.HOAT_DONG);
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
        if (voucherRepository.findCodeVoucher(request.getMa()) != null) {
            // in ra lỗi trùng mã
            throw new RestApiException("Mã voucher đã tồn tại !!!");
        }
        StatusDiscount status = StatusDiscount.CHUA_DIEN_RA;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)) {
            status = StatusDiscount.HOAT_DONG;
        }
        if (request.getNgayBatDau().before(dateTime)) {
            status = StatusDiscount.NGUNG_HOAT_DONG;
        }
        if (request.getNgayKetThuc().after(dateTime)) {
            status = StatusDiscount.CHUA_DIEN_RA;
        }

        String codeVoucher = request.getMa().trim();
        if (request.getMa().isBlank()) {
            codeVoucher = "BEE" + generateRandomCode();
        } else if (!(request.getMa().isBlank() || (request.getMa().length() >= 10 && request.getMa().length() <= 15))) {
            throw new RestApiException("Mã voucher phải đủ 10 ký tự và nhỏ hơn 15 ký từ!!!");
        }
        Voucher voucher = Voucher.builder()
                .ma(codeVoucher)
                .ten(request.getTen().trim())
                .dieuKienApDung(request.getDieuKienApDung())
                .giaTriToiDa(request.getGiaTriToiDa())
                .loaiVoucher(request.getLoaiVoucher())
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
        String codeVoucher = request.getMa().trim();
        if (request.getMa().isBlank()) {
            codeVoucher = "BEE" + generateRandomCode();
        } else if (request.getMa().length() < 10 || request.getMa().length() > 15) {
            throw new RestApiException("Mã voucher phải đủ 10 ký tự !!!");
        }
        StatusDiscount status = StatusDiscount.CHUA_DIEN_RA;
        Date dateTime = new Date();
        if (request.getNgayBatDau().after(dateTime) && request.getNgayKetThuc().before(dateTime)) {
            status = StatusDiscount.HOAT_DONG;
        }
        if (request.getNgayBatDau().before(dateTime)) {
            status = StatusDiscount.NGUNG_HOAT_DONG;
        }
        if (request.getNgayKetThuc().after(dateTime)) {
            status = StatusDiscount.CHUA_DIEN_RA;
        }
        if (voucher.getTrangThai() == StatusDiscount.HOAT_DONG) {
            throw new RestApiException("Không thể sửa khi chưa tạm dừng voucher");
        } else if (voucher.getTrangThai() == StatusDiscount.DA_HUY) {
            throw new RestApiException("Không thể sửa khi voucher này đã bị hủy");
        } else {
            if (voucher != null) {
                voucher.setMa(codeVoucher);
                voucher.setTen(request.getTen().trim());
                voucher.setGiaTriToiDa(request.getLoaiVoucher() == TypeDiscount.VND ? null : request.getGiaTriToiDa());
                voucher.setLoaiVoucher(request.getLoaiVoucher());
                voucher.setDieuKienApDung(request.getDieuKienApDung());
                voucher.setSoLuong(request.getSoLuong());
                voucher.setNgayBatDau(request.getNgayBatDau());
                voucher.setNgayKetThuc(request.getNgayKetThuc());
                voucher.setGiaTriVoucher(request.getGiaTriVoucher());
                voucher.setTrangThai(status);
                return voucherRepository.save(voucher);
            }
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
    public Voucher doiTrangThai(ChangeStatusVoucherRequest request, String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        if (voucher != null) {
            voucher.setTrangThai(request.getStatus());
        }
        return voucherRepository.save(voucher);
//        }
    }

    @Override
    public Voucher kichHoatVoucher(String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        StatusDiscount status = null;
        Date dateTime = new Date();
        if (voucher.getNgayBatDau().after(dateTime) && voucher.getNgayKetThuc().before(dateTime)) {
            status = StatusDiscount.HOAT_DONG;
        }
        if (voucher.getNgayBatDau().before(dateTime)) {
            status = StatusDiscount.NGUNG_HOAT_DONG;
        }
        if (voucher.getNgayKetThuc().after(dateTime)) {
            status = StatusDiscount.CHUA_DIEN_RA;
        }
        if (voucher != null) {
            voucher.setTrangThai(status);
            return voucherRepository.save(voucher);
        }
        return null;
    }

//    @Override
//    public Voucher doiTrangThai(String id) {
//        Voucher voucher = voucherRepository.findById(id).get();
//
//        if (voucherRepository.findById(id) != null) {
//            // in ra lỗi
//        }
//        if (voucher.getTrangThai() == StatusDiscount.HOAT_DONG || voucher.getTrangThai() == StatusDiscount.CHUA_DIEN_RA) {
//            voucher.setTrangThai(StatusDiscount.DA_HUY);
//        } else if (voucher.getTrangThai() == StatusDiscount.DA_HUY) {
//            if (voucher.getNgayBatDau().after(new Date())) {
//                voucher.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
//            } else if (voucher.getNgayKetThuc().after(new Date())) {
//                voucher.setTrangThai(StatusDiscount.HOAT_DONG);
//            }
//        }
//        return voucherRepository.save(voucher);
//    }

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
                    response.setMessage("Mã giảm giá không hợp lệ.");
                } else if (voucher.getMa().equals(input) && voucher.getSoLuong() <= 0) {
                    response.setMessage("Mã giảm giá đã hết lượt sử dụng.");
                } else if (tongTien.compareTo(voucher.getDieuKienApDung()) == -1) {
                    response.setMessage("Đơn hàng không đủ điều kiện.");
                } else if (voucher.getMa().equals(input) && voucher.getSoLuong() > 0 && voucher.getTrangThai() == 1) {
                    response.setVoucher(voucher);
                    response.setStatus(true);
                } else {
                    response.setMessage("Mã giảm giá không hợp lệ.");
                }
            } else {
                response.setMessage("Mã giảm giá không hợp lệ.");
            }
        }
        return response;
    }

    @Scheduled(fixedRate = 5000)
    public void scheduledTask() {

        Integer pageNo = 1;
        FindVoucherRequest request = new FindVoucherRequest();

        // Gọi method getVoucherStatusIsActive với các tham số
        getVoucherStatusIsActive(pageNo, request);
        updateStatusVoucher();
    }


    @Override
    public Page<VoucherResponse> getVoucherStatusIsActive(Integer pageNo, FindVoucherRequest request) {
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
        updateStatusVoucher();
        return voucherRepository.getVoucherStatusIsActive(pageable, request);
    }
}
