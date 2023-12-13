package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.TheNhoRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheNhoResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.TheNhoServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.TheNho;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_THE_NHO_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class TheNhoController {

    @Autowired
    private TheNhoServiceImpl theNhoService;

    @GetMapping("/search")
    public ResponsePage getTheNhoPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<TheNhoResponse> theNho = theNhoService.findAllTheNho(request);
        return new ResponsePage(theNho);
    }

    @GetMapping("/{id}")
    public ResponseObject<TheNhoResponse> getTheNhoById(@PathVariable("id") String id) {
        TheNhoResponse theNho = theNhoService.findOneById(id);
        return new ResponseObject<>(theNho);
    }

    @GetMapping
    public ResponseObject<List<TheNhoResponse>> getTheNho() {
        List<TheNhoResponse> theNho = theNhoService.findAll().stream()
                .filter(products -> StatusCommon.ACTIVE.equals(products.getStatus()))
                .collect(Collectors.toList());
        return new ResponseObject<>(theNho);
    }

    @PostMapping
    public ResponseObject<TheNhoResponse> createTheNho(@RequestBody TheNhoRequest theNhoRequest) throws Exception {
        TheNhoResponse createdTheNho = theNhoService.save(theNhoRequest);
        return new ResponseObject<>(createdTheNho);
    }

    @PutMapping
    public ResponseObject<TheNhoResponse> updateTheNho(@RequestBody TheNhoRequest theNhoRequest) throws Exception {
        TheNhoResponse theNhoResponse = theNhoService.update(theNhoRequest);
        return new ResponseObject<>(theNhoResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<TheNho> doiTrangThai(@PathVariable String id) throws Exception {
        TheNho doiTrangThai = theNhoService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }

}
