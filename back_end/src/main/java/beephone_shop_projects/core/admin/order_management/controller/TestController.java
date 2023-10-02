package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.dto.CartDetailDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.CartItemServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamChiTietRepository;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.constant.HttpStatusCode;
import beephone_shop_projects.infrastructure.constant.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
  private CartItemRepositoryImpl cartItemRepository;

  @Autowired
  private CartItemServiceImpl cartItemService;

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

  @GetMapping("/test1")
  public ResponseEntity<?> home10() {
    List<HoaDon> hoaDons = hoaDonRepository.getOrdersPending();
    return new ResponseEntity<>(hoaDons.stream().map(s -> modelMapper.map(s, OrderResponse.class)), HttpStatus.OK);
  }

  @GetMapping("/test2/{id}")
  public ResponseObject home10(@PathVariable String id) {
    OrderResponse hoaDon = hoaDonService.getOrderPendingById(id);
    return new ResponseObject(hoaDon);
  }

  @GetMapping("/products")
  public ResponseEntity<?> home1() {
    return new ResponseEntity<>(sanPhamChiTietRepository.getAll(), HttpStatus.OK);
  }

//  @GetMapping("/carts/{id}")
//  public ResponseEntity<?> home3(@PathVariable("id") String id) {
//    List<GioHangChiTiet> list = cartItemRepository.getAllByIdCart(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }

  @DeleteMapping("/carts/{id}")
  public ResponseObject home4(@PathVariable("id") String id) throws Exception {
    if (cartItemService.deleteById(id)) {
      return new ResponseObject(HttpStatusCode.NO_CONTENT_CODE, Message.SUCCESS);
    }
    return new ResponseObject(HttpStatusCode.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @PostMapping("/carts")
  public ResponseEntity<?> home2(@RequestBody CartDetailDto cartDetailDto) throws Exception {
    GioHang gioHang = gioHangRepository.findOneById(cartDetailDto.getCartId());
    Optional<SanPhamChiTiet> sanPhamChiTiet = sanPhamChiTietRepository.findById(cartDetailDto.getProductId());

    GioHangChiTiet cartDetail = new GioHangChiTiet();
    cartDetail.setDonGia(cartDetailDto.getPrice());
    cartDetail.setSoLuong(cartDetailDto.getAmount());
    cartDetail.setGioHang(gioHang);
    cartDetail.setSanPhamChiTiet(sanPhamChiTiet.get());

    cartItemRepository.save(cartDetail);

    return new ResponseEntity<>(gioHang, HttpStatus.OK);
  }

  @GetMapping("/payments/{id}")
  public ResponseEntity<?> home(@PathVariable("id") String id) {
    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

}
