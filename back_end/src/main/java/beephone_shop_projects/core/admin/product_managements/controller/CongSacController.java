package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.CongSacServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_CHARGER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class CongSacController {

    @Autowired
    private CongSacServiceImpl congSacService;

    @GetMapping("/search")
    public ResponsePage getMauSacPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<CongSacResponse> congSac = congSacService.findAllCongSac(request);
        return new ResponsePage(congSac);
    }

    @GetMapping
    public ResponseObject<List<CongSacResponse>> getCongSac() {
        List<CongSacResponse> congSac = congSacService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(CongSacResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(congSac);
    }

    @GetMapping("/{id}")
    public ResponseObject<CongSacResponse> getCongSacById(@PathVariable("id") String id) {
        CongSacResponse congSac = congSacService.findOneById(id);
        return new ResponseObject<>(congSac);
    }

    @PostMapping
    public ResponseObject<CongSacResponse> createCongSac(@RequestBody CongSacRequest congSacRequest) throws Exception {
        CongSacResponse createdCongSac = congSacService.save(congSacRequest);
        return new ResponseObject<>(createdCongSac);
    }

    @PutMapping
    public ResponseObject<CongSacResponse> updateCongSac(@RequestBody CongSacRequest congSacRequest) throws Exception {
        CongSacResponse congSacResponse = congSacService.update(congSacRequest);
        return new ResponseObject<>(congSacResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<CongSac> doiTrangThai(@PathVariable String id) throws Exception {
        CongSac doiTrangThai = congSacService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
