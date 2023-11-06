package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.ChipServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CHIP_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ChipController {

    @Autowired
    private ChipServiceImpl chipService;

    @GetMapping
    public ResponseObject<List<ChipResponse>> getChip() {
        List<ChipResponse> chip = chipService.findAll();
        return new ResponseObject<>(chip);
    }

    @PostMapping
    public ResponseObject<ChipResponse> createChip(@RequestBody ChipRequest chipRequest) throws Exception {
        ChipResponse createdChip = chipService.save(chipRequest);
        return new ResponseObject<>(createdChip);
    }

}