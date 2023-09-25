package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import org.springframework.data.domain.Page;

public interface HoaDonService extends GenericService<OrderDto, String> {

  OrderDto getOrderDetailsById(String id, Boolean isPending);

  OrderDto placeOrder(Account account, Voucher voucher) throws Exception;

  Page<OrderDto> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilterDTO) throws Exception;

  OrderDto updateOrder(UpdateOrderDto updateOrder, OrderDto orderDto) throws Exception;

  OrderDto createOrderPending() throws Exception;

  OrderDto updateOrderPending(UpdateOrderDto updateOrderDto) throws Exception;

}
