package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.core.client.models.response.ConfigResponce;
import beephone_shop_projects.core.client.models.response.ProductDetailResponce;
import beephone_shop_projects.core.client.models.response.ProductResponce;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
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
    ProductDetailResponce getProductDetailWithRamMinAndRomMin(@Param("id_product") String id_product);

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

    @Query(value = """
     SELECT MIN(don_gia) FROM san_pham_chi_tiet
    """,nativeQuery = true)
    BigDecimal getMinPriceOfProductDetail();

    @Query(value = """
            SELECT MAX(don_gia) FROM san_pham_chi_tiet
    """,nativeQuery = true)
    BigDecimal getMaxPriceOfProductDetail();

    @Query(value = """
                         SELECT m.id
                         FROM san_pham_chi_tiet a
                         JOIN san_pham m on m.id = a.id_san_pham
                         LEFT JOIN hang c on c.id = m.id_hang
                         JOIN ram f on f.id = a.id_ram
                         JOIN rom g on g.id = a.id_rom
                         LEFT JOIN pin k on k.id = m.id_pin
                         LEFT JOIN dong_san_pham l on l.id = m.id_dong_san_pham
                         LEFT JOIN chip n on n.id = m.id_chip
                         LEFT JOIN man_hinh o on o.id = m.id_man_hinh
                         WHERE  f.dung_luong LIKE :ram
                         AND  g.dung_luong LIKE :rom
                         AND  c.ten_hang LIKE :nha_san_xuat
                         AND   k.dung_luong LIKE :dung_luong
                         AND  o.tan_so_quet LIKE :tan_so_quet
                         AND a.don_gia BETWEEN :donGiaMin and :donGiaMax
                         AND n.ten_chip LIKE :chip
                         AND o.kich_thuoc LIKE :manHinh
                         GROUP BY m.id,m.ten_san_pham,
                          c.ten_hang,
                          n.ten_chip,
                          l.ten_dong_san_pham ,
                          m.delected
            """, nativeQuery = true)
    ArrayList<String> searchByAllPosition( @Param("ram") String ram,
                                          @Param("rom") String rom,
                                          @Param("nha_san_xuat") String nhaSanXuat,
                                          @Param("dung_luong") String dungLuongPin,
                                          @Param("donGiaMin") String donGiaMin,
                                          @Param("donGiaMax") String donGiaMax,
                                          @Param("chip") String chip,
                                          @Param("manHinh") String manHinh,
                                          @Param("tan_so_quet") String tanSoQuet
    );
}