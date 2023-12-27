package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.HangServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_BRAND_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class HangController {

    @Autowired
    private HangServiceImpl hangService;

    @GetMapping("/search")
    public ResponsePage getHangPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<HangResponse> hang = hangService.findAllHang(request);
        return new ResponsePage(hang);
    }

    @GetMapping
    public ResponseObject<List<HangResponse>> getHang() {
        List<HangResponse> hang = hangService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(HangResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(hang);
    }

    @PostMapping
    public ResponseObject<HangResponse> createHang(@RequestBody HangRequest hangRequest) throws Exception {
        HangResponse createdHang = hangService.save(hangRequest);
        return new ResponseObject<>(createdHang);
    }

    @PutMapping
    public ResponseObject<HangResponse> updateHang(@RequestBody HangRequest hangRequest) throws Exception {
        HangResponse hangResponse = hangService.update(hangRequest);
        return new ResponseObject<>(hangResponse);
    }

    @GetMapping("/{id}")
    public ResponseObject<HangResponse> getHangById(@PathVariable("id") String id) {
        HangResponse hang = hangService.findOneById(id);
        return new ResponseObject<>(hang);
    }

    @PutMapping("/{id}")
    public ResponseObject<Hang> doiTrangThai(@PathVariable String id) throws Exception {
        Hang doiTrangThai = hangService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
