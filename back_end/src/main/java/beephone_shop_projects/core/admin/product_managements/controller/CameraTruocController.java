package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.CameraTruocServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        List<CameraTruocResponse> cameraTruoc = cameraTruocService.findAll();
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
