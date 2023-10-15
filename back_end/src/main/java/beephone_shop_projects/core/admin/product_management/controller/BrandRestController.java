package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateBrand;
import beephone_shop_projects.core.admin.product_management.model.responce.BrandResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.BrandServiceImpl;
import beephone_shop_projects.entity.Hang;
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
import java.util.List;

@RestController
@RequestMapping("/hang")
@CrossOrigin(origins = "http://localhost:3000")
public class BrandRestController {


    @Autowired
    private BrandServiceImpl nhaSanXuatService;
    
    @GetMapping("/view-all")
    public Page<Hang> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return nhaSanXuatService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<Hang> getList(){
        return this.nhaSanXuatService.getDanhSachNhaSanXuat();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        nhaSanXuatService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateBrand mauSac) {
        nhaSanXuatService.insert(mauSac);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Hang mauSac, @PathVariable("id")String id) {
        nhaSanXuatService.insert(mauSac);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.nhaSanXuatService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBrand(@RequestParam("text") String text,
                                      @RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(nhaSanXuatService.searchBrand(text, pageable), HttpStatus.ACCEPTED);
    }
}
