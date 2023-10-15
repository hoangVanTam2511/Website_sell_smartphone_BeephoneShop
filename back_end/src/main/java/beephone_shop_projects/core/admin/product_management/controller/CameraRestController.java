package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateCamera;
import beephone_shop_projects.core.admin.product_management.model.responce.CameraResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.CameraServiceImpl;
import beephone_shop_projects.entity.Camera;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/camera")
@CrossOrigin(origins = "http://localhost:3000")
public class CameraRestController {

    @Autowired
    private CameraServiceImpl cameraService;

    @GetMapping("/new-code")
    public  String getNewCode(){
        return this.cameraService.generateNewCode();
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateCamera req) {
        this.cameraService.insert(req);
    }

    @GetMapping("/view-all")
    public ResponseEntity<?> viewAllCamera(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return ResponseEntity.ok(this.cameraService.getAll(pageable));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        this.cameraService.delete(id);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCamera(@RequestParam("text") String text,
                                             @RequestParam(value = "page", defaultValue = "1")Integer page){
        Pageable pageable = PageRequest.of(page - 1, 5);
        return new ResponseEntity<>(this.cameraService.searchCamera(text,pageable), HttpStatus.ACCEPTED);
    }
}
