package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.CartDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/cart-detail")
@CrossOrigin(origins = "http://localhost:3001")
public class CartDetailRestController {

    @Autowired
    private CartDetailServiceImpl cartDetailService;

    @PostMapping("/add-to-cart")
    public ResponseEntity<?> checkDetailCart(@RequestParam("id_customer") String idCustomer,
                                             @RequestParam("id_product_detail") String idProductDetail,
                                             @RequestParam("type") String type) {
        try {
            return new ResponseEntity<>(cartDetailService.setCartWithIdProductDetailAndIdCustomer(idCustomer, idProductDetail, type), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/count-of-cart-detail")
    public ResponseEntity<?> getCountOfCartDetail(@RequestParam("id_customer") String idCustomer){
        try {
            return new ResponseEntity<>(cartDetailService.getCountOfCartDetail(idCustomer), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-cart-details")
    public ResponseEntity<?> getCartDetails(@RequestParam("id_customer") String idCustomer){
        try{
            return new ResponseEntity<>(cartDetailService.getCartDetails(idCustomer), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
 ;
    @DeleteMapping("/delete-cart-details")
    public ResponseEntity<?> deleteCartDetails(@RequestParam("id_cart_detail") String idCartDetail,
                                               @RequestParam("id_customer")String idCustomer){
        try{
            cartDetailService.deleteCartDetail(idCartDetail);
            return new ResponseEntity<>(cartDetailService.getCartDetails(idCustomer), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-all-cart")
    public ResponseEntity<?> deleteCartDetails(@RequestParam("id_customer")String idCustomer){
        try{
            cartDetailService.deleteAllCartByIDCustomer(idCustomer);
            return new ResponseEntity<>(cartDetailService.getCartDetails(idCustomer), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
