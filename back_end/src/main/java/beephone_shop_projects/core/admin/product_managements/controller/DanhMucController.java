package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.DanhMucServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
        List<DanhMucResponse> danhMuc = danhMucService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(DanhMucResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(danhMuc);
    }

    @GetMapping("/{id}")
    public ResponseObject<DanhMucResponse> getDanhMucById(@PathVariable("id") String id) {
        DanhMucResponse danhMuc = danhMucService.findOneById(id);
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
