package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateDisplay;
import beephone_shop_projects.core.admin.product_management.model.responce.DisplayResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.DisplayServiceImpl;
import beephone_shop_projects.entity.ManHinh;
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
@RequestMapping("/man-hinh")
@CrossOrigin(origins = "http://localhost:3000")
public class DisplayRestController {

    @Autowired
    private DisplayServiceImpl displayService;

    @GetMapping("/view-all")
    public Page<ManHinh> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return displayService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<ManHinh> getList(){
        return this.displayService.getDanhSachManHinh();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        displayService.delete(id);
    }

    @PostMapping("/save")
    public void saveSecond(@RequestBody CreateDisplay display) {
        displayService.insert(display);
    }

    @PutMapping("/update/{id}")
        public void update(@RequestBody ManHinh anh ,@PathVariable("id")String id) {
        displayService.insert(anh);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.displayService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchDisplay(@RequestParam("text") String text,
                                        @RequestParam(value = "page", defaultValue = "1")Integer page) {
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(displayService.searchDisplay(text, pageable), HttpStatus.ACCEPTED);
    }
}
