package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import org.springframework.data.domain.Page;

public interface HoaDonService extends GenericService<OrderDto, String> {

  OrderDto getOrderDetailsById(String id);

  OrderDto placeOrder(Account account, Voucher voucher);

  Page<OrderDto> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilterDTO);

  OrderDto updateOrder(UpdateOrderDto updateOrder, OrderDto orderDto);

}
