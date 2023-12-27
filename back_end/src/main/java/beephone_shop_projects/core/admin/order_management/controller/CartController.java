//package beephone_shop_projects.core.admin.order_management.controller;
//
//import beephone_shop_projects.core.admin.order_management.dto.CartDetailDto;
//import beephone_shop_projects.core.admin.order_management.model.response.CartResponse;
//import beephone_shop_projects.core.admin.order_management.service.impl.CartServiceImpl;
//import beephone_shop_projects.core.common.base.ResponseObject;
//import beephone_shop_projects.entity.GioHang;
//import beephone_shop_projects.entity.GioHangChiTiet;
//import beephone_shop_projects.entity.HinhThucThanhToan;
//import beephone_shop_projects.entity.SanPhamChiTiet;
//import beephone_shop_projects.infrastructure.constant.ApiConstants;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping(ApiConstants.ApiSystems.API_CART_URI)
//@CrossOrigin(origins = "http://localhost:3000")
//public class CartController {
//
//  @Autowired
//  private CartServiceImpl gioHangService;
//
//  @GetMapping("/carts/{id}")
//  public ResponseObject<CartResponse> getCartsById(@PathVariable("id") String id) {
//    List<GioHangChiTiet> list = gioHangChiTietRepository.getAllByIdCart(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }
//
//  @DeleteMapping("/carts/{id}")
//  public ResponseEntity<?> home4(@PathVariable("id") String id) {
//    Optional<GioHangChiTiet> cartDetails = gioHangChiTietRepository.findById(id);
//    if (cartDetails.isPresent()) {
//      gioHangChiTietRepository.delete(cartDetails.get());
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//  }
//
//  @PostMapping("/carts")
//  public ResponseEntity<?> home2(@RequestBody CartDetailDto cartDetailDto) throws Exception {
//    GioHang gioHang = gioHangRepository.findOneById(cartDetailDto.getCartId());
//    Optional<SanPhamChiTiet> sanPhamChiTiet = sanPhamChiTietRepository.findById(cartDetailDto.getProductId());
//
//    GioHangChiTiet cartDetail = new GioHangChiTiet();
//    cartDetail.setDonGia(cartDetailDto.getPrice());
//    cartDetail.setSoLuong(cartDetailDto.getAmount());
//    cartDetail.setGioHang(gioHang);
//    cartDetail.setSanPhamChiTiet(sanPhamChiTiet.get());
//
//    gioHangChiTietRepository.save(cartDetail);
//
//    return new ResponseEntity<>(gioHang, HttpStatus.OK);
//  }
//
//  @GetMapping("/payments/{id}")
//  public ResponseEntity<?> home(@PathVariable("id") String id) {
//    List<HinhThucThanhToan> list = hinhThucThanhToanRepository.getPaymentMethodsByOrderId(id);
//    return new ResponseEntity<>(list, HttpStatus.OK);
//  }
//
//
//}
