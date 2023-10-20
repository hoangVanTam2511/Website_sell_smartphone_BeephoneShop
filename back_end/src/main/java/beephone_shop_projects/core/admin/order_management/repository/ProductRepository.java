package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;

public interface ProductRepository extends GenericRepository<SanPham, String> {

  Page<SanPham> findProductByMultipleWithPagination();

}
