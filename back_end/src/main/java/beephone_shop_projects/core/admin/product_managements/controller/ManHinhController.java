package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.core.admin.product_managements.service.ManHinhService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_DISPLAY_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ManHinhController {
    @Autowired
    private ManHinhService manHinhService;

    @GetMapping
    public ResponseObject<List<ManHinhResponse>> getSimCards() {
        List<ManHinhResponse> simCards = manHinhService.findAll();
        return new ResponseObject<>(simCards);
    }

    @GetMapping("/all")
    public ResponsePage<ManHinhResponse> getDisplay(@RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        return new ResponsePage(manHinhService.findAllManHinh(pageNo));
    }

    @PostMapping("/add")
    public ResponseObject<ManHinhResponse> createDisplay(@RequestBody ManHinhRequest manHinhRequest) {
        return new ResponseObject(manHinhService.add(manHinhRequest));
    }

    @PutMapping
    public ResponseObject<ManHinhResponse> updateManHinh(@RequestBody ManHinhRequest manHinhRequest) throws Exception {
        ManHinhResponse manHinhResponse = manHinhService.update(manHinhRequest);
        return new ResponseObject<>(manHinhResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<ManHinh> doiTrangThai(@PathVariable String id) throws Exception {
        ManHinh doiTrangThai = manHinhService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }
}
