package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.CameraSauServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CAMERA_REAR_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class CameraSauController {

    @Autowired
    private CameraSauServiceImpl cameraSauService;

    @GetMapping("/search")
    public ResponsePage getCameraSauPhanTrang(@ModelAttribute FindFilterCamerasRequest request) {
        Page<CameraSauResponse> cameraSau = cameraSauService.findAllCameraSau(request);
        return new ResponsePage(cameraSau);
    }

    @GetMapping("/{id}")
    public ResponseObject<CameraSauResponse> getCameraSauById(@PathVariable("id") String id) {
        CameraSauResponse cameraSau = cameraSauService.findOneById(id);
        return new ResponseObject<>(cameraSau);
    }

    @GetMapping
    public ResponseObject<List<CameraSauResponse>> getCameraSau() {
        List<CameraSauResponse> cameraSau = cameraSauService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(CameraSauResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(cameraSau);
    }

    @PostMapping
    public ResponseObject<CameraSauResponse> createCameraSau(@RequestBody CameraSauRequest cameraSauRequest) throws Exception {
        CameraSauResponse createdCameraSau = cameraSauService.save(cameraSauRequest);
        return new ResponseObject<>(createdCameraSau);
    }

    @PutMapping
    public ResponseObject<CameraSauResponse> updateCameraSau(@RequestBody CameraSauRequest cameraSauRequest) throws Exception {
        CameraSauResponse cameraSauResponse = cameraSauService.update(cameraSauRequest);
        return new ResponseObject<>(cameraSauResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<CameraSau> doiTrangThai(@PathVariable String id) throws Exception {
        CameraSau doiTrangThai = cameraSauService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);

    }
}
