package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateImageRequest;
import beephone_shop_projects.core.admin.product_management.service.impl.AnhServiceImpl;
import beephone_shop_projects.entity.Anh;
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
@RequestMapping("/anh")
@CrossOrigin(origins = "http://localhost:3000")
public class AnhRestController {

    @Autowired
    private AnhServiceImpl anhService;

    @PostMapping("/save")
    public Anh save(@RequestBody CreateImageRequest req) {
        return anhService.insert(req);
    }

}
