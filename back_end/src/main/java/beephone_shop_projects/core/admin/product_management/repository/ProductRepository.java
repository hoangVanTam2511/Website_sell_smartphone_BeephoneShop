package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleOneProductResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.repository.ISanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends ISanPhamRepository {

    Page<SanPham> findAllByDelected(Boolean delected, Pageable pageable);

    @Query(value = """
            SELECT a.id,a.ten_san_pham,b.ten_chip, c.ten_dong_san_pham,d.ten_hang,a.delected
            FROM san_pham a
            JOIN chip b ON b.id = a.id_chip
            JOIN dong_san_pham c ON c.id = a.id_dong_san_pham
            JOIN hang d ON d.id = a.id_hang
            ORDER BY a.created_at desc
             """, nativeQuery = true)
    Page<SanPhamResponce> findAllChiTietSanPham(Pageable pageable);


    @Modifying
    @Transactional
    @Query(value = """
             UPDATE  san_pham SET delected = :delected 
             where id = :id
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);


    List<SanPham> findAllByDelected(Boolean delected);


    @Query(value = """
              SELECT Max(don_gia) FROM san_pham_chi_tiet
            """, nativeQuery = true)
    Double getDonGiaLonNhat();

    @Query(value = """
                      SELECT ROW_NUMBER() OVER() AS stt, m.id,m.ten_san_pham,
                          c.ten_hang,m.cong_sac,m.he_dieu_hanh,m.ma,
                          n.ten_chip,m.mo_ta,o.kich_thuoc AS kich_thuoc_man_hinh,
                          l.ten_dong_san_pham ,o.do_phan_giai AS do_phan_giai_man_hinh,
                          m.delected,k.dung_luong AS dung_luong_pin, m.sim
                         FROM san_pham_chi_tiet a
                         JOIN san_pham m on m.id = a.id_san_pham
                         JOIN cau_hinh b on b.id = a.id_cau_hinh
                         JOIN hang c on c.id = m.id_hang
                         JOIN mau_sac d on d.id = b.id_mau_sac
                         JOIN ram f on f.id = b.id_ram
                         JOIN rom g on g.id = b.id_rom
                         JOIN pin k on k.id = m.id_pin
                         JOIN dong_san_pham l on l.id = m.id_dong_san_pham
                         JOIN chip n on n.id = m.id_chip
                         JOIN man_hinh o on o.id = m.id_man_hinh
                         WHERE  f.kich_thuoc LIKE :ram
                         AND  g.kich_thuoc LIKE :rom
                         AND  c.ten_hang LIKE :nha_san_xuat
                         AND  d.ten_mau_sac LIKE :mau_sac
                         AND   k.dung_luong LIKE :dung_luong
                         AND  l.ten_dong_san_pham LIKE :dong_san_pham
                         AND a.don_gia BETWEEN :donGiaMin and :donGiaMax
                         AND n.ten_chip LIKE :chip
                         AND o.kich_thuoc LIKE :manHinh
                         GROUP BY m.id,m.ten_san_pham,
                          c.ten_hang,
                          n.ten_chip,
                          l.ten_dong_san_pham ,
                          m.delected
            """, nativeQuery = true)
    Page<SanPhamResponce> searchByAllPosition(Pageable pageable
            , @Param("ram") String ram,
                                              @Param("rom") String rom,
                                              @Param("nha_san_xuat") String nhaSanXuat,
                                              @Param("mau_sac") String mauSac,
                                              @Param("dung_luong") String dungLuongPin,
                                              @Param("dong_san_pham") String dongSanPham,
                                              @Param("donGiaMin") String donGiaMin,
                                              @Param("donGiaMax") String donGiaMax,
                                              @Param("chip") String chip,
                                              @Param("manHinh") String manHinh
    );

    @Query(value = """
                SELECT SUBSTRING(ma,9) + 1 FROM san_pham ORDER BY ma DESC LIMIT 0,1
            """, nativeQuery = true)
    String getNewCode();

    @Query(value = """
                SELECT m.ma as 'ma_san_pham',
                m.ten_san_pham as 'ten_san_pham',
                anh.duong_dan as 'duong_dan_anh',
                MIN(a.don_gia), MIN(a.so_luong_ton_kho)
                FROM san_pham_chi_tiet a
                JOIN san_pham m on m.id = a.id_san_pham
                JOIN anh on anh.id_chi_tiet_san_pham = a.id
                JOIN cau_hinh b on b.id = a.id_cau_hinh
                GROUP BY m.ten_san_pham
            """, nativeQuery = true)
    List<PointOfSaleOneProductResponce> getPOSProduct();

}
