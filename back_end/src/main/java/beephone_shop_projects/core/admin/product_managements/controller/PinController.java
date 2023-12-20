package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.PinServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_PIN_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class PinController {

    @Autowired
    private PinServiceImpl pinService;

    @GetMapping("/search")
    public ResponsePage getPinPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<PinResponse> pin = pinService.findAllPin(request);
        return new ResponsePage(pin);
    }

    @GetMapping("/{id}")
    public ResponseObject<PinResponse> getPinById(@PathVariable("id") String id) {
        PinResponse pinResponse = pinService.findOneById(id);
        return new ResponseObject<>(pinResponse);
    }


    @GetMapping
    public ResponseObject<List<PinResponse>> getPin() {
        List<PinResponse> pin = pinService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .sorted(Comparator.comparing(PinResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());
        return new ResponseObject<>(pin);
    }

    @PostMapping
    public ResponseObject<PinResponse> createPin(@RequestBody PinRequest pinRequest) throws Exception {
        PinResponse createdPin = pinService.save(pinRequest);
        return new ResponseObject<>(createdPin);
    }

    @PutMapping
    public ResponseObject<PinResponse> updatePin(@RequestBody PinRequest pinRequest) throws Exception {
        PinResponse pinResponse = pinService.update(pinRequest);
        return new ResponseObject<>(pinResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<Pin> doiTrangThai(@PathVariable String id) throws Exception {
        Pin doiTrangThai = pinService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
