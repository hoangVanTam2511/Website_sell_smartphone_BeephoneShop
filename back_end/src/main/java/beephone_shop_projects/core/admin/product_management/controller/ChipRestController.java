package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChip;
import beephone_shop_projects.core.admin.product_management.model.responce.ChipResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.ChipServiceImpl;
import beephone_shop_projects.entity.Chip;
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
@RequestMapping("/chip")
@CrossOrigin(origins = "http://localhost:3000")
public class ChipRestController {

    @Autowired
    private ChipServiceImpl chipService;

    @GetMapping("/view-all")
    public Page<Chip> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return chipService.getAll(pageable);
    }

    @GetMapping("/get-list")
    public ArrayList<Chip> getList(){
        return this.chipService.getListChip();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        chipService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateChip anh) {
        chipService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody CreateChip chip ,@PathVariable("id")String id) {
        chipService.insert(chip);
    }

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.chipService.generateNewCode();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCamera(@RequestParam("text") String text,
                                           @RequestParam(value = "page", defaultValue = "1")Integer page){
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(this.chipService.searchChip(text, pageable), HttpStatus.ACCEPTED);
    }
}
