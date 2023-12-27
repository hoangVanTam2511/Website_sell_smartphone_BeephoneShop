package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.core.client.models.response.CartDetailResponce;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.repository.IGioHangChiTietRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.ArrayList;

@Transactional
public interface CartDetailClientRepository extends IGioHangChiTietRepository {

    @Query(value = """
            SELECT * FROM gio_hang_chi_tiet
            WHERE id_chi_tiet_san_pham = :id_chi_tiet_san_pham AND id_gio_hang = :id_gio_hang
    """, nativeQuery = true)
    GioHangChiTiet getGioHangByIDKhachHangAndIdGioHang(@Param("id_chi_tiet_san_pham")String idChiTietSanPham, @Param("id_gio_hang")String idGioHang);

    @Query(value = """
            SELECT  IF(SUM(ghct.so_luong) is null, 0, SUM(ghct.so_luong)) FROM gio_hang_chi_tiet ghct
            WHERE id_gio_hang = :id_gio_hang
    """, nativeQuery = true)
    Integer getGioHangChiTietByIDGioHang(@Param("id_gio_hang")String idGioHang);

    @Query(value = """
            SELECT * FROM gio_hang_chi_tiet
            WHERE id = :id_gio_hang_chi_tiet
    """, nativeQuery = true)
    Integer getGioHangChiTietByIDGioHangChiTiet(@Param("id_gio_hang_chi_tiet")String idGioHangChiTiet);

    @Modifying
    @Query(value = """
            DELETE FROM gio_hang_chi_tiet
            WHERE id = :id_gio_hang_chi_tiet
    """, nativeQuery = true)
    void deleteGioHangChiTietByIDGioHangChiTiet(@Param("id_gio_hang_chi_tiet")String idGioHangChiTiet);

    @Modifying
    @Query(value = """
            DELETE FROM gio_hang_chi_tiet
            WHERE id_gio_hang = :id_gio_hang
    """, nativeQuery = true)
    void deleteGioHangChiTietByIdGioHang(@Param("id_gio_hang")String idGioHang);

    @Query(value = """
            SELECT ghct.id AS id_gio_hang_chi_tiet, spct.id AS id_san_pham_chi_tiet, 
            spct.so_luong_ton_kho, spct.don_gia, ms.ten_mau_sac,
            sp.ten_san_pham,
            ram.dung_luong AS dung_luong_ram,
            rom.dung_luong AS dung_luong_rom,   
            ghct.so_luong AS so_luong_sap_mua,
            image.path AS duong_dan,
            IF(kmct.don_gia_sau_khuyen_mai is null ,0, kmct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai
            FROM gio_hang_chi_tiet ghct
            JOIN gio_hang gh ON gh.id = ghct.id_gio_hang
            JOIN san_pham_chi_tiet spct ON spct.id = ghct.id_chi_tiet_san_pham
            LEFT JOIN image ON image.id = spct.id_image
            JOIN san_pham sp ON sp.id = spct.id_san_pham
            LEFT JOIN khuyen_mai_chi_tiet kmct ON kmct.id_chi_tiet_san_pham = spct.id
            JOIN mau_sac ms ON ms.id = spct.id_mau_sac
            JOIN ram ON ram.id = spct.id_ram
            JOIN rom ON rom.id = spct.id_rom
            WHERE gh.id_khach_hang = :id_khach_hang
        """, nativeQuery = true)
    ArrayList<CartDetailResponce> getCartDetails(@Param("id_khach_hang")String idKhachHang);

    @Query(value = """
            SELECT ghct.id AS id_gio_hang_chi_tiet, spct.id AS id_san_pham_chi_tiet, 
            spct.so_luong_ton_kho, spct.don_gia, ms.ten_mau_sac,
            sp.ten_san_pham,
            ram.dung_luong AS dung_luong_ram,
            rom.dung_luong AS dung_luong_rom,   
            ghct.so_luong AS so_luong_sap_mua,
            image.path AS duong_dan,
            IF(kmct.don_gia_sau_khuyen_mai is null ,0, kmct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai
            FROM gio_hang_chi_tiet ghct
            JOIN gio_hang gh ON gh.id = ghct.id_gio_hang
            JOIN san_pham_chi_tiet spct ON spct.id = ghct.id_chi_tiet_san_pham
            LEFT JOIN image ON image.id = spct.id_image
            JOIN san_pham sp ON sp.id = spct.id_san_pham
            LEFT JOIN khuyen_mai_chi_tiet kmct ON kmct.id_chi_tiet_san_pham = spct.id
            JOIN mau_sac ms ON ms.id = spct.id_mau_sac
            JOIN ram ON ram.id = spct.id_ram
            JOIN rom ON rom.id = spct.id_rom
            WHERE ghct.id = :id_product_detail
        """, nativeQuery = true)
    CartDetailResponce getCartDetailByID(@Param("id_product_detail")String idProductDetail);


    @Modifying
    @Query(value = """
        delete from gio_hang_chi_tiet where id_gio_hang = :id_gio_hang and id_chi_tiet_san_pham = :id_chi_tiet_san_pham
    """, nativeQuery = true)
    void deleteCartDetailByIdGioHangAndIdCTSP(@Param("id_gio_hang")String idGioHang, @Param("id_chi_tiet_san_pham")String idChiTietSanPham);
}
