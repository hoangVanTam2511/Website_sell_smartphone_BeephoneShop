package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.DanhMucServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/search")
    public ResponsePage getDanhMucPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<DanhMucResponse> danhMuc = danhMucService.findAllDanhMuc(request);
        return new ResponsePage(danhMuc);
    }

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

    @PutMapping
    public ResponseObject<DanhMucResponse> updateDanhMuc(@RequestBody DanhMucRequest danhMucRequest) throws Exception {
        DanhMucResponse danhMucResponse = danhMucService.update(danhMucRequest);
        return new ResponseObject<>(danhMucResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<DanhMuc> doiTrangThai(@PathVariable String id) throws Exception {
        DanhMuc doiTrangThai = danhMucService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
