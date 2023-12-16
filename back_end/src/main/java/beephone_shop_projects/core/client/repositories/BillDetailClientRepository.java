package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.core.client.models.response.ProductDetailFillterResponce;
import beephone_shop_projects.core.client.models.response.ProductOfBillDetail;
import beephone_shop_projects.repository.IHoaDonChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BillDetailClientRepository extends IHoaDonChiTietRepository {

    @Query(value = """
            select 
            spct.id, 
            sp.ten_san_pham,
            ram.dung_luong as ram,
            rom.dung_luong as rom,
            ms.ten_mau_sac,
            hdct.don_gia,
    		hdct.don_gia_sau_giam,
            hdct.so_luong,
            image.path as duong_dan
            FROM hoa_don hd
            JOIN hoa_don_chi_tiet hdct ON hdct.id_hoa_don = hd.id
            JOIN san_pham_chi_tiet spct ON hdct.id_chi_tiet_san_pham = spct.id
            LEFT JOIN ram ON ram.id = spct.id_ram
            LEFT JOIN rom ON rom.id = spct.id_rom
            LEFT JOIN image ON image.id = spct.id_image
            LEFT JOIN san_pham sp ON sp.id = spct.id_san_pham
            LEFT JOIN mau_sac ms ON ms.id = spct.id_mau_sac
            WHERE hd.id = :id_hoa_don
    """, nativeQuery = true)
    ArrayList<ProductOfBillDetail> getProductOfDetailsByIDBill(@Param("id_hoa_don") String idHoaDon);

    @Query(value= """
       SELECT
       sp.id AS id_san_pham,
       spct.id AS id_san_pham_chi_tiet,
       ram.id AS id_ram,
       rom.id AS id_rom,
       chip.id AS id_chip,
       mh.tan_so_quet AS tan_so_quet,
       mh.kich_thuoc AS kich_thuoc,
       spct.don_gia AS don_gia,
       spct.don_gia_sau_khuyen_mai AS don_gia_sau_khuyen_mai,
       hang.ten_hang,
       dm.id as id_danh_muc
        FROM san_pham_chi_tiet spct
       JOIN san_pham sp ON sp.id = spct.id_san_pham
       JOIN ram ON ram.id = spct.id_ram
       JOIN rom ON rom.id = spct.id_rom
       JOIN chip ON chip.id = sp.id_chip
       JOIN man_hinh mh ON mh.id = sp.id_man_hinh
       JOIN hang ON hang.id = sp.id_hang
       JOIN danh_muc_dien_thoai dmdt ON dmdt.id_san_pham  = sp.id
       JOIN danh_muc dm ON dm.id = dmdt.id_danh_muc
       """, nativeQuery = true)
    ArrayList<ProductDetailFillterResponce> getAllProductDetailFillterResponce();
}
