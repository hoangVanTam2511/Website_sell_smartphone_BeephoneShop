package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.HangServiceImpl;
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
@RequestMapping(ApiConstants.ApiSystems.API_BRAND_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class HangController {

    @Autowired
    private HangServiceImpl hangService;

    @GetMapping
    public ResponseObject<List<HangResponse>> getHang() {
        List<HangResponse> hang = hangService.findAll();
        return new ResponseObject<>(hang);
    }

    @PostMapping
    public ResponseObject<HangResponse> createHang(@RequestBody HangRequest hangRequest) throws Exception {
        HangResponse createdHang = hangService.save(hangRequest);
        return new ResponseObject<>(createdHang);
    }

}