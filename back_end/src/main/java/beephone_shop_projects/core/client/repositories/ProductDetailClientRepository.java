package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.core.client.models.response.*;
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
                  image.path AS duong_dan,
                  sp.ten_san_pham, 
                  IF(spct.don_gia_sau_khuyen_mai is null ,0, spct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai,
                  spct.don_gia, 
                  ram.dung_luong as dung_luong_ram,
                  rom.dung_luong as dung_luong_rom
                  FROM san_pham sp
                  JOIN san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
                  LEFT JOIN image ON image.id = spct.id_image
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
             IF(spct.don_gia_sau_khuyen_mai is null ,0, spct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai,
             spct.don_gia,
             spct.so_luong_ton_kho,
             image.path as duong_dan,
             ms.ten_mau_sac,
             ram.dung_luong as dung_luong_ram,
             rom.dung_luong as dung_luong_rom,
             sp.ten_san_pham
             FROM san_pham sp
             JOIN san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
             JOIN ram ON ram.id = spct.id_ram
             JOIN rom ON rom.id = spct.id_rom
             LEFT JOIN image ON image.id = spct.id_image
             JOIN mau_sac ms ON ms.id = spct.id_mau_sac
              WHERE sp.id = :id_product
             ORDER BY ram.dung_luong ASC, rom.dung_luong ASC
            """, nativeQuery = true)
    ArrayList<ConfigResponce> getConfigByIdProduct(@Param("id_product") String id_product);

    @Query(value = """
             SELECT sp.ten_san_pham,
             chip.ten_chip,
             hang.ten_hang, mh.loai_man_hinh, mh.kich_thuoc AS kich_thuoc_man_hinh,
             sac.loai_cong_sac, tn.loai_the_nho, pin.dung_luong as dung_luong_pin,
             mh.tan_so_quet AS tan_so_quet,
             dpmh.chieu_dai, dpmh.chieu_rong,
             sp.operating_type as he_dieu_hanh
             FROM san_pham AS sp
             LEFT JOIN chip ON chip.id = sp.id_chip
             LEFT JOIN hang ON hang.id = sp.id_hang
             LEFT JOIN man_hinh AS mh ON mh.id = sp.id_man_hinh
             LEFT JOIN sac ON sac.id = sp.id_sac
             LEFT JOIN the_nho AS tn ON tn.id = sp.id_the_nho
             LEFT JOIN pin ON pin.id = sp.id_pin
             LEFT JOIN do_phan_giai_man_hinh dpmh ON dpmh.id = mh.id_do_phan_giai_man_hinh
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
                         AND m.ten_san_pham LIKE :ten_san_pham
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
                                          @Param("tan_so_quet") String tanSoQuet,
                                          @Param("ten_san_pham") String tenSanPham
    );

    @Query(value = """
        SELECT count(id_chi_tiet_san_pham) AS so_luong_ban_ra, id_chi_tiet_san_pham FROM hoa_don_chi_tiet
        GROUP BY id_chi_tiet_san_pham
        ORDER BY so_luong_ban_ra DESC
        """,nativeQuery = true)
    ArrayList<ProductBestSeller> getProductSeller();

    @Query(value = """
                  SELECT
                  sp.id,    
                  image.path AS duong_dan,
                  sp.ten_san_pham, 
                  IF(spct.don_gia_sau_khuyen_mai is null ,0, spct.don_gia_sau_khuyen_mai) AS don_gia_sau_khuyen_mai,
                  spct.don_gia, 
                  ram.dung_luong as dung_luong_ram,
                  rom.dung_luong as dung_luong_rom
                  FROM san_pham sp
                  JOIN san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
                  LEFT JOIN image ON image.id = spct.id_image
                  JOIN ram ON ram.id = spct.id_ram
                  JOIN rom ON rom.id = spct.id_rom
                   WHERE spct.id = :id_product_detail
                  ORDER BY ram.dung_luong ASC, rom.dung_luong ASC
                  LIMIT 0,1
            """, nativeQuery = true)
    ProductDetailResponce getProductDetailByIDProductDetail(@Param("id_product_detail") String idProductDetail);

    @Query(value = """
         SELECT image.path as url, ms.ten_mau_sac from san_pham_chi_tiet spct
         JOIN san_pham sp ON sp.id = spct.id_san_pham
         JOIN mau_sac ms ON ms.id = spct.id_mau_sac
         JOIN image ON image.id = spct.id_image
         WHERE sp.id  = :id_product
        """, nativeQuery = true)
    ArrayList<ImageResponce> getImagesByIDProductDetails(@Param("id_product") String idProduct);

    @Query(value = """
            SELECT ct.do_phan_giai, ctdt.is_camera_main from san_pham sp
            JOIN camera_truoc_dien_thoai ctdt ON ctdt.id_san_pham = sp.id
            JOIN camera_truoc ct ON ct.id = ctdt.id_camera_truoc
            WHERE sp.id = :id_san_pham
    """, nativeQuery = true)
    ArrayList<CameraRearResponce> getCameraTruocByIDSanPham(@Param("id_san_pham") String idSanPham);

    @Query(value = """
            SELECT ct.do_phan_giai, ctdt.is_camera_main from san_pham sp
            JOIN camera_sau_dien_thoai ctdt ON ctdt.id_san_pham = sp.id
            JOIN camera_sau ct ON ct.id = ctdt.id_camera_sau
            WHERE sp.id = :id_san_pham
    """, nativeQuery = true)
    ArrayList<CameraRearResponce> getCameraSauByIDSanPham(@Param("id_san_pham") String idSanPham);

    @Query(value= """
         select count(*)  from imei
         where id_chi_tiet_san_pham = :id_chi_tiet_san_pham
         and trang_thai = 2
    """, nativeQuery = true)
    Integer getSoLuongTonByIDChiTietSanPham(@Param("id_chi_tiet_san_pham") String idChiTietSanPham);
}