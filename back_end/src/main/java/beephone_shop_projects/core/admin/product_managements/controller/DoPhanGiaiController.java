package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;

import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;

import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.service.DoPhanGiaiService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(ApiConstants.ApiSystems.API_RESOLUTION_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class DoPhanGiaiController {
    @Autowired
    private DoPhanGiaiService doPhanGiaiService;

    @GetMapping
    public ResponseObject<List<DoPhanGiaiResponse>> getSimCards() {
        List<DoPhanGiaiResponse> simCards = doPhanGiaiService.findAll();
        return new ResponseObject<>(simCards);
    }
    @PostMapping("/add")
    public ResponseObject<DoPhanGiaiResponse> createResolution(@RequestBody DoPhanGiaiRequest doPhanGiaiRequest)  {
        return new ResponseObject(doPhanGiaiService.add(doPhanGiaiRequest));
    }
}