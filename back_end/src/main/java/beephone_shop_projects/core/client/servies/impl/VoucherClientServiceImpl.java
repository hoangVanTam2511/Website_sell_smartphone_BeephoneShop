package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.VoucherClientRepository;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.StatusDiscount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
public class VoucherClientServiceImpl {

    @Autowired
    private VoucherClientRepository voucherClientRepository;

    public Voucher checkVoucher(String code) throws ParseException {
        Voucher voucher = voucherClientRepository.findByMa(code);

        if (voucher == null) {
            throw new RuntimeException("Không tìm thấy voucher");
        }
        if(voucher.getTrangThai() != StatusDiscount.HOAT_DONG){
            throw new RuntimeException("Voucher không được áp dụng vào thời điểm này");
        }
        return voucher;
    }

}
