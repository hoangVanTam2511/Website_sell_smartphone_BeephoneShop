package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.CameraServiceImpl;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.Camera;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

@RestController
@RequestMapping("/camera")
@CrossOrigin(origins = "http://localhost:3000")
public class CameraRestController  {

    @Autowired
    private CameraServiceImpl cameraService;
    @GetMapping("/view-all")
    public Page<Camera> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return cameraService.getAll(pageable);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        cameraService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody Camera anh) {
        cameraService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Camera anh ,@PathVariable("id")String id) {
        cameraService.insert(anh);
    }

}
