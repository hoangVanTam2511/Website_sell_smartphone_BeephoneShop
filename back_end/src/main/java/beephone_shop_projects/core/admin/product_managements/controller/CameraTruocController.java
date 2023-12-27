package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.CameraTruocServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CAMERA_FRONT_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class CameraTruocController {

    @Autowired
    private CameraTruocServiceImpl cameraTruocService;

    @GetMapping("/search")
    public ResponsePage getCameraTruocPhanTrang(@ModelAttribute FindFilterCamerasRequest request) {
        Page<CameraTruocResponse> cameraTruoc = cameraTruocService.findAllCameraTruoc(request);
        return new ResponsePage(cameraTruoc);
    }

    @GetMapping
    public ResponseObject<List<CameraTruocResponse>> getCameraTruoc() {
        List<CameraTruocResponse> cameraTruoc = cameraTruocService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(CameraTruocResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(cameraTruoc);
    }

    @GetMapping("/{id}")
    public ResponseObject<CameraTruocResponse> getCameraTruocById(@PathVariable("id") String id) {
        CameraTruocResponse cameraTruoc = cameraTruocService.findOneById(id);
        return new ResponseObject<>(cameraTruoc);
    }

    @PostMapping
    public ResponseObject<CameraTruocResponse> createCameraTruoc(@RequestBody CameraTruocRequest cameraTruocRequest) throws Exception {
        CameraTruocResponse createdCameraTruoc = cameraTruocService.save(cameraTruocRequest);
        return new ResponseObject<>(createdCameraTruoc);
    }

    @PutMapping
    public ResponseObject<CameraTruocResponse> updateCameraTruoc(@RequestBody CameraTruocRequest cameraTruocRequest) throws Exception {
        CameraTruocResponse cameraTruocResponse = cameraTruocService.update(cameraTruocRequest);
        return new ResponseObject<>(cameraTruocResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<CameraTruoc> doiTrangThai(@PathVariable String id) throws Exception {
        CameraTruoc doiTrangThai = cameraTruocService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);

    }

}
