package beephone_shop_projects.core.admin.statistic_management.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeSanPhamTop5Response {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.path}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

//    @Value("#{target.ten_mau_sac}")
//    String getTenMauSac();
//
//    @Value("#{target.kich_thuoc_ram}")
//    Integer getKichThuocRam();
//
//    @Value("#{target.kich_thuoc_rom}")
//    Integer getKichThuocRom();

    @Value("#{target.so_luong}")
    Integer getSoLuong();
}
