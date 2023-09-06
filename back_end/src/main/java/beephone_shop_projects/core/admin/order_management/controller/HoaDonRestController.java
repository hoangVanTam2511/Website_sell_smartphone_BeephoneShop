package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.constant.Constants;
import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.core.admin.order_management.repository.GioHangChiTietRepository;
import beephone_shop_projects.core.admin.order_management.service.impl.GioHangServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
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

import java.util.List;

@RestController
@RequestMapping(Constants.Api.API_ORDER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class HoaDonRestController {

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private LichSuHoaDonServiceImpl lichSuHoaDonService;

  @Autowired
  private GioHangServiceImpl gioHangService;

  @Autowired
  private GioHangChiTietRepository gioHangChiTietRepository;

  @GetMapping
  public ResponseEntity<?> getOrders(@ModelAttribute SearchFilterOrderDto searchFilter) throws Exception {
    Page<OrderDto> orders = hoaDonService.findOrdersByMultipleCriteriaWithPagination(searchFilter);
    if (orders.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOrderDetails(@PathVariable("id") String id) {
    OrderDto order = hoaDonService.getOrderDetailsById(id);
    if (order == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(order, HttpStatus.OK);
  }

  @GetMapping("/{id}/orderHistory")
  public ResponseEntity<?> getOrderHistoriesByOrderId(@PathVariable("id") String id) {
    OrderDto order = hoaDonService.getOrderDetailsById(id);
    List<OrderHistoryDto> orderHistories = lichSuHoaDonService.getOrderHistoriesByOrderId(order.getMa());
    if (order == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    if (orderHistories.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(orderHistories, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<?> createOrder(Account account, Voucher voucher, @RequestParam(value = "isPending", required = true) Boolean isPending) throws Exception {
    if (!isPending) {
      OrderDto placedOrder = hoaDonService.placeOrder(account, voucher);
      return new ResponseEntity<>(placedOrder, HttpStatus.CREATED);
    }
    OrderDto createdOrderPending = hoaDonService.createOrderPending();
    return new ResponseEntity<>(createdOrderPending, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateOrder(@RequestBody UpdateOrderDto updateOrderDTO, @PathVariable("id") String id, @RequestParam(value = "isPending", required = true) Boolean isPending
          , @RequestParam(value = "hasPlaceOrder", defaultValue = "false") Boolean hasPlaceOrder) throws Exception {
    if (!isPending) {
      OrderDto order = hoaDonService.getOrderDetailsById(id);
      if (order == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      OrderDto updatedOrder = hoaDonService.updateOrder(updateOrderDTO, order);
      return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
    OrderDto updatedOrderPending = hoaDonService.updateOrderPending(updateOrderDTO);
    if (hasPlaceOrder) {
      String cartId = updatedOrderPending.getGioHang().getId();
      updatedOrderPending.setGioHang(null);
      hoaDonService.save(updatedOrderPending);
      gioHangService.deleteById(cartId);
    }
    return new ResponseEntity<>(updatedOrderPending, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteOrderPending(@PathVariable("id") String id) throws Exception {
    OrderDto getOrder = hoaDonService.findOneById(id);
    if (getOrder == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    hoaDonService.deleteById(getOrder.getId());
    gioHangService.deleteById(getOrder.getGioHang().getId());
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }


}
