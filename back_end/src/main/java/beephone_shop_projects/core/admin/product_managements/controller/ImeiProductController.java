package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterImeisRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.ImeiProductRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.ImeiProductResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.ImeiProductServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_IMEI_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ImeiProductController {

    @Autowired
    private ImeiProductServiceImpl imeiService;

    @GetMapping("/search")
    public ResponsePage getImeiPhanTrang(@ModelAttribute FindFilterImeisRequest request) {
        Page<ImeiProductResponse> imei = imeiService.findAllImei(request);
        return new ResponsePage(imei);
    }

    @GetMapping
    public ResponseObject<List<ImeiProductResponse>> getImei() {
        List<ImeiProductResponse> imei = imeiService.findAll();
        return new ResponseObject<>(imei);
    }

    @GetMapping("/{id}")
    public ResponseObject<ImeiProductResponse> getImeiById(@PathVariable("id") String id) {
        ImeiProductResponse imei = imeiService.findOneById(id);
        return new ResponseObject<>(imei);
    }

    @PutMapping
    public ResponseObject<ImeiProductResponse> updateImei(@RequestBody ImeiProductRequest imeiProductRequest) throws Exception {
        ImeiProductResponse imeiProductResponse = imeiService.update(imeiProductRequest);
        return new ResponseObject<>(imeiProductResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<Imei> doiTrangThai(@PathVariable String id) throws Exception {
        Imei doiTrangThai = imeiService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
