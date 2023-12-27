package beephone_shop_projects.core.admin.product_management.model.responce;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.List;

@Projection(types = { Ram.class, Rom.class, MauSac.class, SanPhamChiTiet.class})
public interface CauHinhResponce {

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.mau_sac}")
    String getMauSac();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.id}")
    String getId();

//    @Value("#{target.imei}")
//    List<Imei> getImei();

    @Value("#{target.id_san_pham}")
    String getIdSanPham();
}
