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


}
