package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.PinClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/pin")
@CrossOrigin(origins = "http://localhost:3001")
public class PinClientController {

    @Autowired
    private PinClientServiceImpl pinClientService;

    @GetMapping("/get-list-pins")
    public ResponseEntity<?> getListPins() {
        return new ResponseEntity<>(pinClientService.getListPins(), null, 200);
    }
}
