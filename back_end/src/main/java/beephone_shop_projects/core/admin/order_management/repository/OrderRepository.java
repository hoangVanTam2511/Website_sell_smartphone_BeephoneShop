package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderPaginationCustomResponse;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderRepository extends GenericRepository<HoaDon, String> {

  Page<OrderPaginationCustomResponse> findOrdersByMultipleCriteriaWithPagination(Pageable pageable, SearchFilterOrderDto searchFilter);

  List<HoaDon> getOrdersPending();

  HoaDon getOrderPendingById(String id);

  HoaDon getOrderDetailsById(String id);
}
