package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.dto.CartDetailDto;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.CartItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
  private ProductDetailRepository productDetailRepository;

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
    return new ResponseObject(productDetailRepository.getProducts().stream().map(s -> modelMapper.map(s, ProductItemResponse.class)));
  }

//  @GetMapping("/carts/{id}")
//  public ResponseEntity<?> home3(@PathVariable("id") String id) {
//    List<GioHangChiTiet> list = cartItemRepository.getAllByIdCart(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }

  @DeleteMapping("/carts/{id}")
  public ResponseObject home4(@PathVariable("id") String id) throws Exception {
    cartItemRepository.deleteById(id);
    return new ResponseObject(HttpStatus.NO_CONTENT_CODE, Message.SUCCESS);
  }

  @PostMapping("/carts")
  public ResponseEntity<?> home2(@RequestBody CartDetailDto cartDetailDto) throws Exception {
    GioHang gioHang = gioHangRepository.findOneById(cartDetailDto.getCartId());
    Optional<SanPhamChiTiet> sanPhamChiTiet = productDetailRepository.findById(cartDetailDto.getProductId());
    Optional<GioHangChiTiet> gioHangChiTiet = cartItemRepository.findProductItem(sanPhamChiTiet.get().getId(), gioHang.getId());
    GioHangChiTiet cartDetail = new GioHangChiTiet();
    if (gioHangChiTiet.isPresent()) {
      if (gioHangChiTiet.get().getSoLuong() >= 4 || gioHangChiTiet.get().getSoLuong() + cartDetailDto.getAmount() > 4) {
        throw new RestApiException("Chỉ được phép chọn tối đa 4 sản phẩm!");
      } else{
        gioHangChiTiet.get().setSoLuong(gioHangChiTiet.get().getSoLuong() + cartDetailDto.getAmount());
//        sanPhamChiTiet.get().setSoLuongTonKho(sanPhamChiTiet.get().getSoLuongTonKho() - cartDetail.getSoLuong());
//        sanPhamChiTietRepository.save(sanPhamChiTiet.get());
        cartItemRepository.save(gioHangChiTiet.get());
      }
    }
    else{
      cartDetail.setDonGia(cartDetailDto.getPrice());
      cartDetail.setSoLuong(cartDetailDto.getAmount());
      cartDetail.setGioHang(gioHang);
      cartDetail.setSanPhamChiTiet(sanPhamChiTiet.get());
      sanPhamChiTiet.get().setSoLuongTonKho(sanPhamChiTiet.get().getSoLuongTonKho() - cartDetail.getSoLuong());
      productDetailRepository.save(sanPhamChiTiet.get());
      cartItemRepository.save(cartDetail);
    }

    return new ResponseEntity<>(gioHang, org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/payments/{id}")
  public ResponseEntity<?> home(@PathVariable("id") String id) {
    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
    return new ResponseEntity<>(list, org.springframework.http.HttpStatus.OK);
  }

  @GetMapping("/test1000/{id}")
  public ResponseEntity<?> homegg(@PathVariable("id") String id) {
    Optional<GioHangChiTiet> gioHangChiTiet = cartItemRepository.findProductItem(id, "1");
    return new ResponseEntity<>(gioHangChiTiet, org.springframework.http.HttpStatus.OK);
  }
}
