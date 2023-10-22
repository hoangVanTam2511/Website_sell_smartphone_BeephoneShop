package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.RomRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RomResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.RomServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_ROM_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class RomController {

    @Autowired
    private RomServiceImpl RomService;

    @GetMapping
    public ResponseObject<List<RomResponse>> getRom() {
        List<RomResponse> Rom = RomService.findAll();
        return new ResponseObject<>(Rom);
    }

    @PostMapping
    public ResponseObject<RomResponse> createRom(@RequestBody RomRequest RomRequest) throws Exception {
        RomResponse createdRom = RomService.save(RomRequest);
        return new ResponseObject<>(createdRom);
    }

}
