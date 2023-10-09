package beephone_shop_projects.core.admin.product_management.model.responce;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ProductDetailResponce {

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.ten_mau_sac}")
    String getMauSac();

    @Value("#{target.so_luong_ton_kho}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.id}")
    String getId  ();
}
