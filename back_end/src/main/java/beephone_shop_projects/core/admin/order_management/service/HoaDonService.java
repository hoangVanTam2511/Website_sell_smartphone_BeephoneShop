package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HoaDonService extends GenericService<OrderResponse, OrderRequest, String> {

  OrderResponse getOrderDetailsById(String id);

  OrderResponse placeOrder(OrderRequest orderRequest) throws Exception;

  Page<OrderResponse> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilterDTO) throws Exception;

  OrderResponse updateStatusOrderDelivery(OrderRequest req, String id) throws Exception;

  OrderResponse createOrderPending() throws Exception;

  OrderResponse updateOrPaymentOrderPending(OrderRequest req, String id) throws Exception;

  List<OrderResponse> getOrdersPending() throws Exception;

  OrderResponse getOrderPendingById(String id);

  Boolean deleteOrderPening(String id) throws Exception;

  OrderResponse rollBackStatusOrder(OrderRequest req) throws Exception;

}
