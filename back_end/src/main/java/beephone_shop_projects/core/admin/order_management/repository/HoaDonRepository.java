package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HoaDonRepository extends GenericRepository<HoaDon, String> {

  HoaDon getOrderDetailsById(String id, Boolean isPending);

  Page<HoaDon> findOrdersByMultipleCriteriaWithPagination(Pageable pageable, SearchFilterOrderDto searchFilter);

}
