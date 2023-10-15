package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleProductResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.ProductDetailResponce;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProductDetailRepository extends ISanPhamChiTietRepository {
  @Query("SELECT P FROM SanPhamChiTiet P")
  List<SanPhamChiTiet> getAll();

  @Query("""
                select P, I, C, CH from SanPhamChiTiet P join fetch P.images I
                join fetch P.sanPham C
                join fetch C.pin join fetch C.hang join fetch C.dongSanPham
                join fetch C.manHinh join fetch C.chip join P.cauHinh CH
                join fetch CH.mauSac join fetch CH.ram join fetch CH.rom
          """)
  List<SanPhamChiTiet> getProducts();

  @Query(value = """
        SELECT SUBSTRING(ma,16) + 1 FROM san_pham_chi_tiet ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
  String getNewCode();

  @Query(value = """
          SELECT  spct.so_luong_ton_kho,spct.don_gia from san_pham_chi_tiet  spct
        JOIN cau_hinh  ch ON ch.id = spct.id_cau_hinh
        JOIN san_pham  sp ON sp.id = spct.id_san_pham
        JOIN rom ON rom.id = ch.id_rom
        JOIN ram ON ram.id = ch.id_ram
        JOIN mau_sac ms ON ms.id = ch.id_mau_sac
        WHERE sp.id = :idProduct AND ram.kich_thuoc = :ram AND rom.kich_thuoc = :rom
        AND ms.ten_mau_sac = :mau_sac
        ORDER BY  ram.kich_thuoc ASC, rom.kich_thuoc ASC
    """,nativeQuery = true)
  List<PointOfSaleProductResponce> getPointOfSaleProductResponce(@Param("idProduct")String idProduct,
                                                                 @Param("ram")Integer ram,
                                                                 @Param("rom")Integer rom,
                                                                 @Param("mau_sac")String mau_sac
                                                                 );

  @Query(value = """    
            SELECT spct.delected,spct.so_luong_ton_kho,spct.id,
            spct.don_gia,ram.kich_thuoc AS 'kich_thuoc_ram',rom.kich_thuoc AS 'kich_thuoc_rom',mau_sac.ten_mau_sac 
            FROM san_pham_chi_tiet AS spct
            JOIN cau_hinh AS ch ON ch.id = spct.id_cau_hinh
            JOIN ram ON ram.id=  ch.id_ram
            JOIN rom ON rom.id = ch.id_rom
            JOIN mau_sac ON mau_sac.id = ch.id_mau_sac
            WHERE  spct.id_san_pham = :idSanPham
          """,nativeQuery = true)
  ArrayList<ProductDetailResponce> getListProductDetailByID(@Param("idSanPham")String idSanPham);
}
