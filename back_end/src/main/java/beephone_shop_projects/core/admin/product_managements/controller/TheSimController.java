package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.TheSimServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.TheSim;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_SIM_CARD_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class TheSimController {

    @Autowired
    private TheSimServiceImpl theSimService;

    @GetMapping("/search")
    public ResponsePage getTheSimPhanTrang(@ModelAttribute FindFilterProductsRequest request) {
        Page<TheSimResponse> theSim = theSimService.findAllTheSim(request);
        return new ResponsePage(theSim);
    }

    @GetMapping("/all")
    public ResponseObject<List<TheSimResponse>> getSimCards() {
        List<TheSimResponse> simCards = theSimService.findAll();
        return new ResponseObject<>(simCards);
    }

    @GetMapping("/{id}")
    public ResponseObject<TheSimResponse> getTheSimById(@PathVariable("id") String id) {
        TheSimResponse theSim = theSimService.findOneById(id);
        return new ResponseObject<>(theSim);
    }

    @GetMapping
    public ResponsePage<TheSimResponse> getSimCards(@RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        return new ResponsePage(theSimService.findAllSimCards(pageNo));
    }

    @PostMapping("/add")
    public ResponseObject<TheSimResponse> createSimCard(@RequestBody List<TheSimRequest> theSimRequest) throws Exception {
        List<TheSimResponse> createdSimCards = new ArrayList<>();
        for (TheSimRequest request : theSimRequest) {
            TheSimResponse createdSimCard = theSimService.save(request);
            createdSimCards.add(createdSimCard);
        }
        return new ResponseObject(createdSimCards);
    }

    @PutMapping
    public ResponseObject<TheSimResponse> updateTheSim(@RequestBody TheSimRequest theSimRequest) throws Exception {
        TheSimResponse theSimResponse = theSimService.update(theSimRequest);
        return new ResponseObject<>(theSimResponse);
    }

    @PutMapping("/{id}")
    public ResponseObject<TheSim> doiTrangThai(@PathVariable String id) throws Exception {
        TheSim doiTrangThai = theSimService.doiTrangThai(id);
        return new ResponseObject<>(doiTrangThai);
    }
}
