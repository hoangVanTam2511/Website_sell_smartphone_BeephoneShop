package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.PinServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_PIN_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class PinController {

    @Autowired
    private PinServiceImpl pinService;

    @GetMapping
    public ResponseObject<List<PinResponse>> getPin() {
        List<PinResponse> pin = pinService.findAll();
        return new ResponseObject<>(pin);
    }

    @PostMapping
    public ResponseObject<PinResponse> createPin(@RequestBody PinRequest pinRequest) throws Exception {
        PinResponse createdPin = pinService.save(pinRequest);
        return new ResponseObject<>(createdPin);
    }

}
