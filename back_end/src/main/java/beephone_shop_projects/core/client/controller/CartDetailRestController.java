package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.serives.impl.CartDetailServiceImpl;
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
                                          @RequestParam("id_product_detail") String idProductDetail){
        return new ResponseEntity<>(cartDetailService.setCartWithIdProductDetailAndIdCustomer(idCustomer, idProductDetail), HttpStatus.OK);
    }

    @GetMapping("/count-of-cart-detail")
    public ResponseEntity<?> getCountOfCartDetail(@RequestParam("id_customer") String idCustomer){
        return new ResponseEntity<>(cartDetailService.getCountOfCartDetail(idCustomer), HttpStatus.OK);
    }

}
