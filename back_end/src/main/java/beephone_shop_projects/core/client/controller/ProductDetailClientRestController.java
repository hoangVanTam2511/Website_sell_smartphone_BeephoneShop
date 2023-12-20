package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.SearchProductDetailClient;
import beephone_shop_projects.core.client.servies.impl.BillDetailClientServiceImpl;
import beephone_shop_projects.core.client.servies.impl.ProductDetailClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/product-detail")
@CrossOrigin("*")
public class ProductDetailClientRestController {

    @Autowired
    private ProductDetailClientService productDetailService;

    @Autowired
    private BillDetailClientServiceImpl billDetailService;

    @GetMapping("/get-list-products")
    public ResponseEntity<?> getListProductDetails() {
        try {
            return new ResponseEntity<>(productDetailService.getProductDetails(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-products-best-seller")
    public ResponseEntity<?> getListProductBestSeller() {
        try {
            return new ResponseEntity<>(productDetailService.getProductBestSeller(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-config/{id}")
    public ResponseEntity<?> getConfigOfIdProduct(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(productDetailService.getConfig(id), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-product/{id}")
    public ResponseEntity<?> getProductOfIdProduct(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(productDetailService.getProductByIdProduct(id), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-max-price")
    public ResponseEntity<?> getMaxPrice(){
        return new ResponseEntity<>(productDetailService.getMaxProductDetail(), HttpStatus.OK);
    }

    @GetMapping("/get-min-price") 
    public ResponseEntity<?> getMinPrice(){
        return new ResponseEntity<>(productDetailService.getMinProductDetail(), HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                              @RequestBody(required = false) SearchProductDetailClient chiTietSanPhamRequest) {
        Object httpStatus;
        return new ResponseEntity<>(productDetailService.searchByAllPosition(chiTietSanPhamRequest), HttpStatus.OK);
    }

    @GetMapping("/get-product-detail")
    public ResponseEntity<?> getProductDetail(){
        try{
            return new ResponseEntity<>(billDetailService.getAllProductDetailFillterResponce(), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-images/{id}")
    public ResponseEntity<?> getImages(@PathVariable("id") String idProduct){
        try{
            return new ResponseEntity<>(productDetailService.getImagesByIDProductDetail(idProduct), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/camera-rear")
    public ResponseEntity<?> getCameraRears(@RequestParam("id") String id){
        try{
         return new ResponseEntity<>(productDetailService.getCameraSauByIDSanPham(id), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/camera-front")
    public ResponseEntity<?> getCameraFronts(@RequestParam("id") String id){
        try{
            return new ResponseEntity<>(productDetailService.getCameraTruocByIDSanPham(id), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-quantity-inventory")
    public ResponseEntity<?> getQuantityInventory(@RequestParam("id") String id){
        try{
            return new ResponseEntity<>(productDetailService.getSoLuongTonByIDChiTietSanPham(id), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
