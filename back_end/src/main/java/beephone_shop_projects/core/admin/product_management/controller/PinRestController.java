package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreatePin;
import beephone_shop_projects.core.admin.product_management.service.impl.PinServiceImpl1;
import beephone_shop_projects.entity.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/pin")
@CrossOrigin(origins = "http://localhost:3000")
public class PinRestController {

    @Autowired
    private PinServiceImpl1 pinService;

    @GetMapping("/view-all")
    public Page<Pin> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return pinService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<Pin> getList(){
        return this.pinService.getDanhSachPin();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        pinService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreatePin pin) {
        pinService.insert(pin);
    }


    @PutMapping("/update/{id}")
    public void update(@RequestBody Pin mauSac,@PathVariable("id")String id) {
        pinService.insert(mauSac);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.pinService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPin(@RequestParam("text")String name,
                                    @RequestParam(value = "page", defaultValue = "1")Integer page){
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(pinService.searchPin(name, pageable), HttpStatus.ACCEPTED);
    }
}
