package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.RamServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_RAM_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class RamController {

    @Autowired
    private RamServiceImpl ramService;

    @GetMapping("/search")
    public ResponsePage getRamPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<RamResponse> ram = ramService.findAllRam(request);
        return new ResponsePage(ram);
    }

    @GetMapping("/{id}")
    public ResponseObject<RamResponse> getRamById(@PathVariable("id") String id) {
        RamResponse ram = ramService.findOneById(id);
        return new ResponseObject<>(ram);
    }

    @GetMapping
    public ResponseObject<List<RamResponse>> getRam() {
        List<RamResponse> Ram = ramService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(RamResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(Ram);
    }

    @PostMapping
    public ResponseObject<RamResponse> createRam(@RequestBody RamRequest RamRequest) throws Exception {
        RamResponse createdRam = ramService.save(RamRequest);
        return new ResponseObject<>(createdRam);
    }

    @PutMapping
    public ResponseObject<RamResponse> updateRam(@RequestBody RamRequest ramRequest) throws Exception {
        RamResponse ramResponse = ramService.update(ramRequest);
        return new ResponseObject<>(ramResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<Ram> doiTrangThai(@PathVariable String id) throws Exception {
        Ram doiTrangThai = ramService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
