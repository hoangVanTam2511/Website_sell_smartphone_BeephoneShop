package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.RamServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_RAM_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class RamController {

    @Autowired
    private RamServiceImpl ramService;

    @GetMapping
    public ResponseObject<List<RamResponse>> getRam() {
        List<RamResponse> Ram = ramService.findAll();
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
