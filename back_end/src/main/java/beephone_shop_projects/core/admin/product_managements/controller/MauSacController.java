package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.MauSacServiceImpl;
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
@RequestMapping(ApiConstants.ApiSystems.API_COLOR_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacController {

    @Autowired
    private MauSacServiceImpl mauSacService;

    @GetMapping
    public ResponseObject<List<MauSacResponse>> getMauSac() {
        List<MauSacResponse> mauSac = mauSacService.findAll();
        return new ResponseObject<>(mauSac);
    }

    @PostMapping
    public ResponseObject<MauSacResponse> createMauSac(@RequestBody MauSacRequest mauSacRequest) throws Exception {
        MauSacResponse createdMauSac = mauSacService.save(mauSacRequest);
        return new ResponseObject<>(createdMauSac);
    }

}
