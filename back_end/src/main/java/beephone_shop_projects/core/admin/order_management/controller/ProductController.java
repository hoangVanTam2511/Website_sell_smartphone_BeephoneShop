package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemResponse;
import beephone_shop_projects.core.admin.order_management.repository.ProductCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.ProductItemCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.ProductServiceImpl;
import beephone_shop_projects.core.admin.product_managements.service.impl.ImageServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_PRODUCT_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

  @Autowired
  private ImageServiceImpl imageService;

  @Autowired
  private ProductServiceImpl productService;

  @Autowired
  private ProductItemCustomRepository productItemCustomRepository;

  @Autowired
  private ProductCustomRepository productCustomRepository;

  @Autowired
  private ProductRepositoryImpl productRepository;

  @Autowired
  private ModelMapper modelMapper;

  @GetMapping("/product-items")
  public ResponseObject home1() {
    return new ResponseObject(productItemCustomRepository.getProducts().stream().map(s -> modelMapper.map(s, ProductItemResponse.class)));
  }

  @GetMapping("/product-items/{id}")
  public ResponseObject getProductsItemByIdProduct(@PathVariable String id) {
    return new ResponseObject(productItemCustomRepository.getProductsById(id).stream().map(s -> modelMapper.map(s, ProductItemResponse.class)));
  }

  @GetMapping
  public ResponseObject home111() {
    return new ResponseObject(productRepository.findAll().stream().map(s -> modelMapper.map(s, ProductCustomResponse.class)));
  }

  @GetMapping("/{id}")
  public ResponseObject getProduct(@PathVariable String id) {
    Optional<SanPham> findProduct = productCustomRepository.findProductById(id);
    if (findProduct.isPresent()) {
      return new ResponseObject(findProduct.map(s -> modelMapper.map(s, ProductCustomResponse.class)));
    }
    return new ResponseObject(beephone_shop_projects.infrastructure.constant.HttpStatus.SERVER_ERROR_COMMON, Message.SERVER_ERROR_COMMON);
  }

  @PostMapping(value = "/upload-multiple")
  public ResponseEntity<?> createFiles(@RequestPart("files") MultipartFile[] files, @RequestParam String ma) throws Exception {
    imageService.uploadImage(files, ma);
    return new ResponseEntity("a", HttpStatus.OK);
  }

  @PostMapping
  public ResponseObject<ProductCustomResponse> createProduct(@RequestBody ProductItemConfigurationsRequest req) throws Exception {
    ProductCustomResponse createdProduct = productService.createProduct(req);
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
