package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.TheSimServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_SIM_CARD_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class TheSimController {

  @Autowired
  private TheSimServiceImpl theSimService;
  @GetMapping("/all")
  public ResponseObject<List<TheSimResponse>> getSimCards() {
    List<TheSimResponse> simCards = theSimService.findAll();
    return new ResponseObject<>(simCards);
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
//  @PostMapping("/add")
//  public ResponseObject<TheSimResponse> createSimCard(@RequestBody TheSimRequest theSimRequest) {
//    return new ResponseObject(theSimService.add(theSimRequest));
//  }
}
