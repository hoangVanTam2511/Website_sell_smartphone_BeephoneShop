package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietCauHinhResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietSanPhamResponce;
import beephone_shop_projects.entity.ChiTietSanPham;
import beephone_shop_projects.repository.IChiTietSanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamReponsitory extends IChiTietSanPhamRepository {

    Page<ChiTietSanPham> findAllByDelected(Boolean delected, Pageable pageable);

    @Query(value = """
            SELECT a.id,b.ten as ten_san_pham,
             c.ten_nha_san_xuat,d.ten_mau_sac,
             e.hinh_thuc as hinh_thuc_san_pham,
             f.kich_thuoc as kich_thuoc_ram,
             g.kich_thuoc as kich_thuoc_rom,
             k.dung_luong as dung_luong_pin,
             l.ten_dong_san_pham , a.don_gia, COUNT(y.id) as so_luong,
             a.delected
            FROM chi_tiet_san_pham a
            JOIN san_pham b on a.id_san_pham = b.id
            JOIN nha_san_xuat c on c.id = a.id_nha_san_xuat
            JOIN mau_sac d on d.id = a.id_mau_sac
            JOIN hinh_thuc_san_pham e on e.id = a.id_hinh_thuc
            JOIN ram f on f.id = a.id_ram
            JOIN rom g on g.id = a.id_rom
            JOIN pin k on k.id = a.id_pin
            JOIN dong_san_pham l on l.id = a.id_dong_san_pham
            LEFT JOIN imei y on y.id_chi_tiet_san_pham = a.id
            group by a.id,b.ten,c.ten_nha_san_xuat,d.ten_mau_sac,e.hinh_thuc,
            a.don_gia order by a.created_at desc
            """, nativeQuery = true)
    Page<ChiTietSanPhamResponce> findAllChiTietSanPham(Pageable pageable);

    @Query(value = """
                                    
                        SELECT a.id,b.ten as ten_san_pham,
                                    c.ten_nha_san_xuat,d.ten_mau_sac,
                                    e.hinh_thuc as hinh_thuc_san_pham,
                                    f.kich_thuoc as kich_thuoc_ram,
                                    g.kich_thuoc as kich_thuoc_rom,
                                    k.dung_luong as dung_luong_pin,
                                    l.ten_dong_san_pham , a.don_gia, COUNT(y.id) as so_luong,
                                    a.delected
                                   FROM chi_tiet_san_pham a
                                   JOIN san_pham b on a.id_san_pham = b.id
                                   JOIN nha_san_xuat c on c.id = a.id_nha_san_xuat
                                   JOIN mau_sac d on d.id = a.id_mau_sac
                                   JOIN hinh_thuc_san_pham e on e.id = a.id_hinh_thuc
                                   JOIN ram f on f.id = a.id_ram
                                   JOIN rom g on g.id = a.id_rom
                                   JOIN pin k on k.id = a.id_pin
                                   JOIN dong_san_pham l on l.id = a.id_dong_san_pham
                                   JOIN camera  m on m.id = a.id_camera
                                   JOIN chip n on n.id = a.id_chip
                                   JOIN man_hinh o on o.id = a.id_man_hinh
                                   LEFT JOIN imei y on y.id_chi_tiet_san_pham = a.id
                                   WHERE  f.kich_thuoc LIKE :ram
                                   AND  b.ten LIKE :sanPham
                                   AND  g.kich_thuoc LIKE :rom
                                   AND  c.ten_nha_san_xuat LIKE :nha_san_xuat
                                   AND  d.ten_mau_sac LIKE :mau_sac
                                   AND  e.hinh_thuc LIKE :hinh_thuc
                                   AND   k.dung_luong LIKE :dung_luong
                                   AND  l.ten_dong_san_pham LIKE :dong_san_pham
                                   AND m.do_phan_giai LIKE :camera
                                   AND a.don_gia BETWEEN :donGiaMin and :donGiaMax
                                   AND n.ten_chip LIKE :chip
                                   AND o.kich_thuoc LIKE :manHinh
                                   GROUP BY a.id,b.ten,c.ten_nha_san_xuat,d.ten_mau_sac,e.hinh_thuc,
                                              a.don_gia
                        """, nativeQuery = true)
    Page<ChiTietSanPhamResponce> searchByAllPosition(Pageable pageable
            , @Param("ram") String ram,
                                                     @Param("rom") String rom,
                                                     @Param("nha_san_xuat") String nhaSanXuat,
                                                     @Param("mau_sac") String mauSac,
                                                     @Param("hinh_thuc") String hinhThuc,
                                                     @Param("dung_luong") String dungLuongPin,
                                                     @Param("dong_san_pham") String dongSanPham,
                                                     @Param("camera") String camera,
                                                     @Param("donGiaMin") String donGiaMin,
                                                     @Param("donGiaMax") String donGiaMax,
                                                     @Param("chip") String chip,
                                                     @Param("manHinh") String manHinh,
                                                     @Param("sanPham") String sanPham
                                                     );

    @Modifying
    @Transactional
    @Query(value = """
             UPDATE  chi_tiet_san_pham SET delected = :delected 
             where id = :id
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);


    List<ChiTietSanPham> findAllByDelected(Boolean delected);


    @Query(value = """
              SELECT DISTINCT
                         c.ten_nha_san_xuat,
                         e.hinh_thuc as hinh_thuc_san_pham,
                         f.kich_thuoc as kich_thuoc_ram,
                         g.kich_thuoc as kich_thuoc_rom,
                         k.dung_luong as dung_luong_pin
                        FROM chi_tiet_san_pham a
                        JOIN san_pham b on a.id_san_pham = b.id
                        JOIN nha_san_xuat c on c.id = a.id_nha_san_xuat
                        JOIN mau_sac d on d.id = a.id_mau_sac
                        JOIN hinh_thuc_san_pham e on e.id = a.id_hinh_thuc
                        JOIN ram f on f.id = a.id_ram
                        JOIN rom g on g.id = a.id_rom
                        JOIN pin k on k.id = a.id_pin
                        JOIN dong_san_pham l on l.id = a.id_dong_san_pham
                        LEFT JOIN imei y on y.id_chi_tiet_san_pham = a.id
                        group by a.id,b.ten,c.ten_nha_san_xuat,d.ten_mau_sac,e.hinh_thuc,
                        a.don_gia order by a.created_at DESC
            """, nativeQuery = true)
    Page<ChiTietCauHinhResponce> getChiTietCauHinh(Pageable pageable);
}
