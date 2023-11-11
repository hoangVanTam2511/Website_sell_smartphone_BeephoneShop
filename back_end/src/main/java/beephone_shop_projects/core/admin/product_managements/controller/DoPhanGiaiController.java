package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;
import beephone_shop_projects.core.admin.product_managements.service.DoPhanGiaiService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(ApiConstants.ApiSystems.API_RESOLUTION_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class DoPhanGiaiController {
    @Autowired
    private DoPhanGiaiService doPhanGiaiService;

    @GetMapping
    public ResponseObject<List<DoPhanGiaiResponse>> getSimCards() {
        List<DoPhanGiaiResponse> simCards = doPhanGiaiService.findAll();
        return new ResponseObject<>(simCards);
    }

    @PostMapping("/add")
    public ResponseObject<DoPhanGiaiResponse> createResolution(@RequestBody DoPhanGiaiRequest doPhanGiaiRequest) {
        return new ResponseObject(doPhanGiaiService.add(doPhanGiaiRequest));
    }

    @PutMapping
    public ResponseObject<DoPhanGiaiResponse> updateDoPhanGiai(@RequestBody DoPhanGiaiRequest doPhanGiaiRequest) throws Exception {
        DoPhanGiaiResponse doPhanGiaiResponse = doPhanGiaiService.update(doPhanGiaiRequest);
        return new ResponseObject<>(doPhanGiaiResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<DoPhanGiaiManHinh> doiTrangThai(@PathVariable String id) throws Exception {
        DoPhanGiaiManHinh doiTrangThai = doPhanGiaiService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }
}
