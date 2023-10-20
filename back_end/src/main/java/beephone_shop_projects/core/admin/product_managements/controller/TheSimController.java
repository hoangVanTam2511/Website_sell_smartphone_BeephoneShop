package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.TheSimServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_SIM_CARD_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class TheSimController {

  @Autowired
  private TheSimServiceImpl theSimService;

  @GetMapping
  public ResponseObject<List<TheSimResponse>> getSimCards() {
    List<TheSimResponse> simCards = theSimService.findAll();
    return new ResponseObject<>(simCards);
  }

  @PostMapping
  public ResponseObject<TheSimResponse> createSimCard(@RequestBody TheSimRequest theSimRequest) throws Exception {
    TheSimResponse createdSimCard = theSimService.save(theSimRequest);
    return new ResponseObject<>(createdSimCard);
  }

}
