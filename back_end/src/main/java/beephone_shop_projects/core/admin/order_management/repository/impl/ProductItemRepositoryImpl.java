package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.ProductItemRepository;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class ProductItemRepositoryImpl extends AbstractRepositoryImpl<SanPhamChiTiet, String> implements ProductItemRepository {
  @Override
  public Page<SanPhamChiTiet> findProductItemByMultipleWithPagination() {
    return null;
  }
}
