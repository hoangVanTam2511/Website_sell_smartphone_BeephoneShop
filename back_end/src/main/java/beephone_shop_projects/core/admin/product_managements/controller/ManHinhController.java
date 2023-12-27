package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.core.admin.product_managements.service.ManHinhService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_DISPLAY_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ManHinhController {
    @Autowired
    private ManHinhService manHinhService;

    @GetMapping
    public ResponseObject<List<ManHinhResponse>> getSimCards() {
        List<ManHinhResponse> manHinh = manHinhService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(ManHinhResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(manHinh);
    }

    @GetMapping("/search")
    public ResponsePage getMHPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<ManHinhResponse> manHinhs = manHinhService.findAllMH(request);
        return new ResponsePage(manHinhs);
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

    @GetMapping("/{id}")
    public ResponseObject<ManHinhResponse> getManHinhById(@PathVariable("id") String id) {
        ManHinhResponse manHinh = manHinhService.findOneById(id);
        return new ResponseObject<>(manHinh);
    }

    @PutMapping("/{id}")
    public ResponseObject<ManHinh> doiTrangThai(@PathVariable String id) throws Exception {
        ManHinh doiTrangThai = manHinhService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }
}
