package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderHistoryResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.core.common.base.PageResponse;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.HttpStatusCode;
import beephone_shop_projects.infrastructure.constant.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashSet;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_ORDER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private LichSuHoaDonServiceImpl lichSuHoaDonService;

  @GetMapping
  public PageResponse<OrderResponse> getOrders(@ModelAttribute SearchFilterOrderDto searchFilter) throws Exception {
    Page<OrderResponse> orders = hoaDonService.findOrdersByMultipleCriteriaWithPagination(searchFilter);
    return new PageResponse(orders);
  }

  @GetMapping("/pending")
  public ResponseObject<OrderResponse> getOrdersPending() {
    List<OrderResponse> ordersPending = hoaDonService.getOrdersPending();
    return new ResponseObject(ordersPending);
  }

  @GetMapping("/{id}")
  public ResponseObject<OrderResponse> getOrderDetailsById(@PathVariable("id") String id) {
    OrderResponse order = hoaDonService.getOrderDetailsById(id);
    return new ResponseObject(order);
  }

  @GetMapping("/pending/{id}")
  public ResponseObject<OrderResponse> getOrderPendingById(@PathVariable("id") String id) {
    OrderResponse order = hoaDonService.getOrderPendingById(id);
    return new ResponseObject(order);
  }

  @PostMapping
  public ResponseObject<OrderResponse> createOrder(Account account, Voucher voucher, @RequestParam(value = "isPending", required = true) Boolean isPending) throws Exception {
    if (!isPending) {
      OrderResponse placedOrder = hoaDonService.placeOrder(account, voucher);
      return new ResponseObject(placedOrder);
    }
    OrderResponse createdOrderPending = hoaDonService.createOrderPending();
    return new ResponseObject(createdOrderPending);
  }

  @PutMapping("/{id}")
  public ResponseObject<OrderResponse> updateOrder(@RequestBody OrderRequest req, @PathVariable String id,
                                                   @RequestParam("isUpdateStatusOrderDelivery") Boolean isUpdateStatusOrderDelivery) throws Exception {
    if (isUpdateStatusOrderDelivery) {
      OrderResponse updatedStatusOrderDelivery = hoaDonService.updateStatusOrderDelivery(req, id);
      return new ResponseObject(updatedStatusOrderDelivery);
    }
    OrderResponse updatedOrderPending = hoaDonService.processingPaymentOrder(req, id);
    return new ResponseObject(updatedOrderPending);
  }

  @DeleteMapping("/{id}")
  public ResponseObject<OrderResponse> deleteOrderPending(@PathVariable("id") String id) throws Exception {
    if (hoaDonService.deleteOrderPening(id)) {
      return new ResponseObject(HttpStatusCode.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatusCode.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }


}
