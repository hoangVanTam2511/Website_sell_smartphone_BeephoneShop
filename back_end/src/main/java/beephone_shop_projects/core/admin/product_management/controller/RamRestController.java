package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateRam;
import beephone_shop_projects.core.admin.product_management.service.impl.RamServiceImpl1;
import beephone_shop_projects.entity.Ram;
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
@RequestMapping("/ram")
@CrossOrigin(origins = "http://localhost:3000")
public class RamRestController {

    @Autowired
    private RamServiceImpl1 ramService;

    @GetMapping("/view-all")
    public Page<Ram> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return ramService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<Ram> getList(){
        return this.ramService.getDanhSachRam();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        ramService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateRam ram) {
        ramService.insert(ram);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Ram mauSac,@PathVariable("id")String id) {
        ramService.insert(mauSac);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.ramService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRam(@RequestParam("text")String name,
                                    @RequestParam(value = "page", defaultValue = "1")Integer page){
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(ramService.searchRam(name, pageable), HttpStatus.ACCEPTED);
    }
}
