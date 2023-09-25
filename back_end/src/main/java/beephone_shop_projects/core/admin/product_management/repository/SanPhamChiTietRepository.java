package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import org.springframework.data.jpa.repository.Query;
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

}
