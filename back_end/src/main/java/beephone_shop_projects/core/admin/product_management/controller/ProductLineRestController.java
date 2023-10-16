package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductLine;
import beephone_shop_projects.core.admin.product_management.service.impl.ProductLineServiceImpl;
import beephone_shop_projects.entity.DongSanPham;
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
@RequestMapping("/dong-san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductLineRestController {

    @Autowired
    private ProductLineServiceImpl dongSanPhamService;

    @GetMapping("/view-all")
    public Page<DongSanPham> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return dongSanPhamService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<DongSanPham> getList(){
        return this.dongSanPhamService.getDanhSachDongSanPham();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        dongSanPhamService.delete(id);
    }
    
    @PostMapping("/save")
    public void save(@RequestBody CreateProductLine anh) {
        dongSanPhamService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody DongSanPham anh ,@PathVariable("id")String id) {
        dongSanPhamService.insert(anh);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.dongSanPhamService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRam(@RequestParam("text")String name,
                                       @RequestParam(value = "page", defaultValue = "1")Integer page){
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(dongSanPhamService.searchProductLine(name, pageable), HttpStatus.ACCEPTED);
    }
}
