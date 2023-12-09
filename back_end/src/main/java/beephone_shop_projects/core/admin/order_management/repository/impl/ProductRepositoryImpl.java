package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.ProductItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.ProductRepository;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepositoryImpl extends AbstractRepositoryImpl<SanPham, String> implements ProductRepository {
  @Override
  public Page<SanPham> findProductByMultipleWithPagination() {
    return null;
  }
}
