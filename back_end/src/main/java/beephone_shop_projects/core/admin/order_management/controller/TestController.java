package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.CartItemServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamChiTietRepository;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

  @Autowired
  private SanPhamChiTietRepository sanPhamChiTietRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private CartRepositoryImpl gioHangRepository;

  @Autowired
  private OrderRepositoryImpl hoaDonRepository;

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

  @Autowired
  private CartItemServiceImpl cartItemService;

  @GetMapping("/test1")
  public ResponseEntity<?> home10() {
    List<HoaDon> hoaDons = hoaDonRepository.getOrdersPending();
    return new ResponseEntity<>(hoaDons.stream().map(s -> modelMapper.map(s, OrderResponse.class)), org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/test2/{id}")
  public ResponseObject home10(@PathVariable String id) {
    OrderResponse hoaDon = hoaDonService.getOrderPendingById(id);
    return new ResponseObject(hoaDon);
  }

  @GetMapping("/products")
  public ResponseObject home1() {
    return new ResponseObject(sanPhamChiTietRepository.getProducts().stream().map(s -> modelMapper.map(s, ProductItemResponse.class)));
  }

//  @GetMapping("/carts/{id}")
//  public ResponseEntity<?> home3(@PathVariable("id") String id) {
//    List<GioHangChiTiet> list = cartItemRepository.getAllByIdCart(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }

  @DeleteMapping("/carts/{id}")
  public ResponseObject home4(@PathVariable("id") String id) throws Exception {
    boolean deleted = cartItemService.removeCartItemById(id);
    if (deleted){
      return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @PutMapping("/carts")
  public ResponseObject home2(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse addProductItemToCart = cartItemService.addProductItemToCart(req);
    return new ResponseObject(addProductItemToCart);
  }

  @PutMapping("/carts/amount")
  public ResponseObject home222(@RequestBody CartItemRequest req) throws Exception {
    CartItemResponse updatedCartItem = cartItemService.updateAmountItemInCart(req);
    return new ResponseObject(updatedCartItem);
  }

  @GetMapping("/payments/{id}")
  public ResponseEntity<?> home(@PathVariable("id") String id) {
    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
    return new ResponseEntity<>(list, org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/test1000/{id}")
  public ResponseObject homegg(@PathVariable("id") String id) {
    return new ResponseObject(sanPhamChiTietRepository.findProductById(id));
  }
}
