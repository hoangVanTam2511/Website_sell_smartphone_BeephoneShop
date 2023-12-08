package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductItemDto;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductItemRepository extends GenericRepository<SanPhamChiTiet, String> {

  Page<SanPhamChiTiet> findProductItemByMultipleWithPagination(Pageable pageable, SearchFilterProductItemDto searchFilter);

}
