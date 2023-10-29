package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.CongSacServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CHARGER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class CongSacController {

    @Autowired
    private CongSacServiceImpl congSacService;

    @GetMapping
    public ResponseObject<List<CongSacResponse>> getCongSac() {
        List<CongSacResponse> congSac = congSacService.findAll();
        return new ResponseObject<>(congSac);
    }

    @PostMapping
    public ResponseObject<CongSacResponse> createCongSac(@RequestBody CongSacRequest congSacRequest) throws Exception {
        CongSacResponse createdCongSac = congSacService.save(congSacRequest);
        return new ResponseObject<>(createdCongSac);
    }

}
