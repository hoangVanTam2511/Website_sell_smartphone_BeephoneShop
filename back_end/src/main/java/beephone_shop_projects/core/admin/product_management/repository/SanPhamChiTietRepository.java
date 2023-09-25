package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleProductResponce;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietRepository extends ISanPhamChiTietRepository {
  @Query("SELECT P FROM SanPhamChiTiet P")
  List<SanPhamChiTiet> getAll();


  @Query(value = """
        SELECT CONCAT( 'CHITIETSANPHAM_',IF(count(*)  = 0,0,SUBSTRING(ma,16) + 1)) FROM san_pham_chi_tiet
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

}
