//package beephone_shop_projects.core.admin.order_management.controller;
//
//import beephone_shop_projects.core.admin.order_management.constant.Constants;
//import beephone_shop_projects.core.admin.order_management.dto.CartDto;
//import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
//import beephone_shop_projects.core.admin.order_management.service.impl.GioHangServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping(Constants.Api.API_CART_URI)
//@CrossOrigin(origins = "http://localhost:3000")
//public class GioHangRestController {
//
//  @Autowired
//  private GioHangServiceImpl gioHangService;
//
////  @GetMapping("/{id}")
////  public ResponseEntity<?> getCartDetailByOrderId(@PathVariable("id") String id) {
////
////  }
//
//  @PostMapping
//  public ResponseEntity<?> createCart(@RequestBody OrderDto orderDto) throws Exception {
//    CartDto cartDto = new CartDto();
//    cartDto.setMa(gioHangService.getMaxEntityCodeByClass());
//    cartDto.setHoaDon(orderDto);
//
//    CartDto createdCart = gioHangService.save(cartDto);
//    return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
//
//  }
//
//  @DeleteMapping("/{id}")
//  public ResponseEntity<?> removeCartByOrderId(@PathVariable("id") String id) throws Exception {
//    CartDto cart = gioHangService.getCartByOrderId(id);
//    if (cart == null) {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//    gioHangService.deleteById(cart.getId());
//    return new ResponseEntity<>(cart, HttpStatus.NO_CONTENT);
//  }
//
//
//}
