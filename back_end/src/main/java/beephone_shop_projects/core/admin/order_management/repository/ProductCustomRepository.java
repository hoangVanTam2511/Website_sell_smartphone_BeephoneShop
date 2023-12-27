package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import beephone_shop_projects.repository.ISanPhamRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductCustomRepository extends ISanPhamRepository {

  @Query("""
          SELECT P FROM SanPham P WHERE P.id = ?1
          """)
  Optional<SanPham> findProductById(String id);


}
