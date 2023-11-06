package beephone_shop_projects.core.admin.promotion_management.model.reponse;


import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {SanPham.class, Ram.class, Rom.class, MauSac.class, Anh.class
})
public interface SanPhamChiTietKhuyenMaiResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.path}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.delected}")
    Boolean getDelected();

    @Value("#{target.id_san_pham}")
    String getIdSanPham();
}
