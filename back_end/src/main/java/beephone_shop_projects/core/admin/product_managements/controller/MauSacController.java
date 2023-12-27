package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.MauSacServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_COLOR_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacController {

    @Autowired
    private MauSacServiceImpl mauSacService;

    @GetMapping("/search")
    public ResponsePage getMauSacPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<MauSacResponse> mauSac = mauSacService.findAllMauSac(request);
        return new ResponsePage(mauSac);
    }

    @GetMapping
    public ResponseObject<List<MauSacResponse>> getMauSac() {
        List<MauSacResponse> mauSac = mauSacService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(MauSacResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(mauSac);
    }

    @GetMapping("/{id}")
    public ResponseObject<MauSacResponse> getMauSacById(@PathVariable("id") String id) {
        MauSacResponse mauSac = mauSacService.findOneById(id);
        return new ResponseObject<>(mauSac);
    }

    @PostMapping
    public ResponseObject<MauSacResponse> createMauSac(@RequestBody MauSacRequest mauSacRequest) throws Exception {
        MauSacResponse createdMauSac = mauSacService.save(mauSacRequest);
        return new ResponseObject<>(createdMauSac);
    }


    @PutMapping
    public ResponseObject<MauSacResponse> updateMauSac(@RequestBody MauSacRequest mauSacRequest) throws Exception {
        MauSacResponse update = mauSacService.update(mauSacRequest);
        return new ResponseObject<>(update);
    }

    @PutMapping("/doi-trang-thai/{id}")
    public ResponseObject<MauSac> doiTrangThai(@PathVariable String id) throws Exception {
        MauSac delete = mauSacService.doiTrangThai(id);
        return new ResponseObject<>(delete);
    }
}
