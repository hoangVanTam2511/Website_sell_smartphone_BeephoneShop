package beephone_shop_projects.core.admin.promotion_management.model.reponse;

import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(types = {SanPham.class, Ram.class, Rom.class, MauSac.class, Anh.class
})
public interface SanPhamChiTietSauKhuyenMaiResponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getId();

    @Value("#{target.duong_dan}")
    String getDuongDan();

    @Value("#{target.id_san_pham}")
    String getIdSanPham();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.kich_thuoc_ram}")
    Integer getKichThuocRam();

    @Value("#{target.kich_thuoc_rom}")
    Integer getKichThuocRom();

    @Value("#{target.id_khuyen_mai}")
    String getIdKhuyenMaiSPCT();

    @Value("#{target.ma_khuyen_mai}")
    String getMaKhuyenMai();

    @Value("#{target.ten_khuyen_mai}")
    String getTenKhuyenMaiSPCT();

    @Value("#{target.gia_tri_khuyen_mai}")
    BigDecimal getGiaTriKhuyenMai();

    @Value("#{target.loai_khuyen_mai}")
    Integer getLoaiKhuyenMai();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.ngay_bat_dau}")
    Date getNgayBatDauSPCT();

    @Value("#{target.ngay_ket_thuc}")
    Date getNgayKetThucSPCT();

    @Value("#{target.don_gia_sau_khuyen_mai}")
    BigDecimal getDonGiaSauKhuyenMai();

    @Value("#{target.delected}")
    Boolean getDelected();
}
