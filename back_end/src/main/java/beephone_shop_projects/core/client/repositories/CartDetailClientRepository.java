package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.repository.IGioHangChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartDetailClientRepository extends IGioHangChiTietRepository {

    @Query(value = """
            SELECT * FROM gio_hang_chi_tiet
            WHERE id_chi_tiet_san_pham = :id_chi_tiet_san_pham AND id_gio_hang = :id_gio_hang
    """, nativeQuery = true)
    GioHangChiTiet getGioHangByIDKhachHangAndIdGioHang(@Param("id_chi_tiet_san_pham")String idChiTietSanPham, @Param("id_gio_hang")String idGioHang);

    @Query(value = """
            SELECT COUNT(*) FROM gio_hang_chi_tiet
            WHERE id_gio_hang = :id_gio_hang
    """, nativeQuery = true)
    Integer getGioHangChiTietByIDGioHang(@Param("id_gio_hang")String idGioHang);

}
