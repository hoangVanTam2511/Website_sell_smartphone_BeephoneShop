package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationsResponse;
import beephone_shop_projects.core.admin.order_management.service.impl.ProductItemServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.ProductServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_PRODUCT_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

  @Autowired
  private ProductItemServiceImpl productItemService;

  @Autowired
  private ProductServiceImpl productService;

//  @GetMapping
//  public ResponsePage<OrderResponse> getOrders(@ModelAttribute SearchFilterOrderDto searchFilter) throws Exception {
//    Page<OrderResponse> orders = hoaDonService.findOrdersByMultipleCriteriaWithPagination(searchFilter);
//    return new ResponsePage(orders);
//  }


//  @GetMapping("/{id}")
//  public ResponseObject<OrderResponse> getOrderDetailsById(@PathVariable("id") String id) {
//    OrderResponse order = hoaDonService.getOrderDetailsById(id);
//    return new ResponseObject(order);
//  }

//  @PostMapping("/productItems")
//  public ResponseObject<List<ProductItemConfigurationResponse>> createProductItemConfiguration(@RequestBody ProductItemConfigurationsRequest req) throws Exception {
//    List<ProductItemConfigurationResponse> createdProductItems = productItemService.createProductItemConfiguration(req);
//    return new ResponseObject(createdProductItems);
//  }

  @PostMapping
  public ResponseObject<ProductItemConfigurationsResponse> createProduct(@RequestBody ProductItemConfigurationsRequest req) throws Exception {
    ProductItemConfigurationsResponse createdProduct = productService.createProduct(req);
    return new ResponseObject(createdProduct);
  }

//  @PutMapping("/{id}")
//  public ResponseObject<OrderResponse> updateOrder(@RequestBody OrderRequest req, @PathVariable String id,
//                                                   @RequestParam("isUpdateStatusOrderDelivery") Boolean isUpdateStatusOrderDelivery) throws Exception {
//    if (isUpdateStatusOrderDelivery) {
//      OrderResponse updatedStatusOrderDelivery = hoaDonService.updateStatusOrderDelivery(req, id);
//      return new ResponseObject(updatedStatusOrderDelivery);
//    }
//    OrderResponse updatedOrderPending = hoaDonService.updateOrPaymentOrderPending(req, id);
//    return new ResponseObject(updatedOrderPending);
//  }

}
