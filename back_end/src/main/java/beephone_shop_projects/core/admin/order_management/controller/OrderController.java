package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderPaginationCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.repository.OrderCustomRepository;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_ORDER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private OrderCustomRepository orderCustomRepository;

  @Autowired
  private LichSuHoaDonServiceImpl lichSuHoaDonService;

  @Autowired
  private ModelMapper modelMapper;

  @GetMapping("/printer")
  public ResponseObject<OrderResponse> getOrders() throws Exception {
    Optional<HoaDon> order = orderCustomRepository.getOrderAtTheCounterAfterPayment();
    if (order.isPresent()) {
      return new ResponseObject(order.map(s -> modelMapper.map(s, OrderResponse.class)));
    }
    return new ResponseObject(beephone_shop_projects.infrastructure.constant.HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @GetMapping
  public ResponsePage<OrderPaginationCustomResponse> getOrders(@ModelAttribute SearchFilterOrderDto searchFilter) throws Exception {
    Page<OrderPaginationCustomResponse> orders = hoaDonService.findOrdersByMultipleCriteriaWithPagination(searchFilter);
    return new ResponsePage(orders);
  }

  @GetMapping("/pending")
  public ResponseObject<OrderResponse> getOrdersPending() throws Exception {
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
  public ResponseObject<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest, @RequestParam(value = "isPending", required = true) Boolean isPending) throws Exception {
    if (isPending) {
      OrderResponse createdOrderPending = hoaDonService.createOrderPending(orderRequest.getCreatedBy());
      return new ResponseObject(createdOrderPending);
    }
    OrderResponse placedOrder = hoaDonService.placeOrder(orderRequest);
    return new ResponseObject(placedOrder);
  }

  @PutMapping("/update-info-delivery")
  public ResponseObject<OrderResponse> updateInfoOrderDelivery(@RequestBody OrderRequest req) throws Exception {
    OrderResponse updateInfoOrder = hoaDonService.updateInfoOrderDelivery(req);
    return new ResponseObject(updateInfoOrder);
  }

  @PutMapping("/roll-back-status")
  public ResponseObject<OrderResponse> rollBackStatusOrder(@RequestBody OrderRequest req) throws Exception {
    OrderResponse rollBack = hoaDonService.rollBackStatusOrder(req);
    return new ResponseObject(rollBack);
  }

  @PutMapping("/{id}")
  public ResponseObject<OrderResponse> updateOrder(@RequestBody OrderRequest req, @PathVariable String id,
                                                   @RequestParam("isUpdateStatusOrderDelivery") Boolean isUpdateStatusOrderDelivery) throws Exception {
    if (isUpdateStatusOrderDelivery) {
      OrderResponse updatedStatusOrderDelivery = hoaDonService.updateStatusOrderDelivery(req, id);
      return new ResponseObject(updatedStatusOrderDelivery);
    }
    OrderResponse updatedOrderPending = hoaDonService.updateOrPaymentOrderPending(req, id);
    return new ResponseObject(updatedOrderPending);
  }

  @DeleteMapping("/{id}")
  public ResponseObject<OrderResponse> deleteOrderPending(@PathVariable("id") String id) throws Exception {
    if (hoaDonService.deleteOrderPening(id)) {
      return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }


}
