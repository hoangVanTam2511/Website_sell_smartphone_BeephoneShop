package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.DanhMucServiceImpl;
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
@RequestMapping(ApiConstants.ApiSystems.API_DANH_MUC_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class DanhMucController {

    @Autowired
    private DanhMucServiceImpl danhMucService;

    @GetMapping
    public ResponseObject<List<DanhMucResponse>> getDanhMuc() {
        List<DanhMucResponse> danhMuc = danhMucService.findAll();
        return new ResponseObject<>(danhMuc);
    }

    @PostMapping
    public ResponseObject<DanhMucResponse> createDanhMuc(@RequestBody DanhMucRequest danhMucRequest) throws Exception {
        DanhMucResponse createdDanhMuc = danhMucService.save(danhMucRequest);
        return new ResponseObject<>(createdDanhMuc);
    }

}
