package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.core.client.models.response.ConfigResponce;
import beephone_shop_projects.core.client.models.response.ProductDetailResponse;
import beephone_shop_projects.core.client.models.response.ProductResponce;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface ProductDetailClientRepository extends ISanPhamChiTietRepository {

    @Query(value = """
                  SELECT
                  sp.id,
                  anh.duong_dan,
                  sp.ten_san_pham, 
                  IF(kmct.don_gia_sau_khuyen_mai is null ,0, kmct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai,
                  spct.don_gia, 
                  ram.dung_luong as dung_luong_ram,
                  rom.dung_luong as dung_luong_rom
                  FROM san_pham sp
                  JOIN san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
                  LEFT JOIN khuyen_mai_chi_tiet kmct ON kmct.id_chi_tiet_san_pham = spct.id
                  LEFT JOIN anh ON anh.id = spct.id_image
                  JOIN ram ON ram.id = spct.id_ram
                  JOIN rom ON rom.id = spct.id_rom
                   WHERE sp.id = :id_product
                  ORDER BY ram.dung_luong ASC, rom.dung_luong ASC
                  LIMIT 0,1
            """, nativeQuery = true)
    ProductDetailResponse getProductDetailWithRamMinAndRomMin(@Param("id_product") String id_product);

    @Query(value = """
            SELECT
             spct.id,
             IF(kmct.don_gia_sau_khuyen_mai is null ,0, kmct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai,
             spct.don_gia,
             anh.duong_dan,
             ms.ten_mau_sac,
             ram.dung_luong as dung_luong_ram,
             rom.dung_luong as dung_luong_rom
             FROM san_pham sp
             JOIN san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
             LEFT JOIN khuyen_mai_chi_tiet kmct ON kmct.id_chi_tiet_san_pham = spct.id
             JOIN ram ON ram.id = spct.id_ram
             JOIN rom ON rom.id = spct.id_rom
             LEFT JOIN anh ON anh.id = spct.id_image
             JOIN mau_sac ms ON ms.id = spct.id_mau_sac
              WHERE sp.id = :id_product
             ORDER BY ram.dung_luong ASC, rom.dung_luong ASC
            """, nativeQuery = true)
    ArrayList<ConfigResponce> getConfigByIdProduct(@Param("id_product") String id_product);

    @Query(value = """
             SELECT sp.ten_san_pham,
             chip.ten_chip,
             dsp.ten_dong_san_pham,
             hang.ten_hang, mh.loai_man_hinh, mh.kich_thuoc AS kich_thuoc_man_hinh,
             sac.loai_cong_sac, tn.loai_the_nho, pin.dung_luong as dung_luong_pin
             FROM san_pham AS sp
             JOIN chip ON chip.id = sp.id_chip
             JOIN dong_san_pham AS dsp ON dsp.id = sp.id_dong_san_pham
             JOIN hang ON hang.id = sp.id_hang
             JOIN man_hinh AS mh ON mh.id = sp.id_man_hinh
             JOIN sac ON sac.id = sp.id_sac
             JOIN the_nho AS tn ON tn.id = sp.id_the_nho
             JOIN pin ON pin.id = sp.id_pin
             WHERE sp.id = :id_product
            """, nativeQuery = true)
    ProductResponce getProductByIdProduct(@Param("id_product") String id_product);
}