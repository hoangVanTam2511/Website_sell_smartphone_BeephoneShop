package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.ChipClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/chip")
@CrossOrigin(origins = "http://localhost:3001")
public class ChipClientController {

    @Autowired
    private ChipClientServiceImpl chipClientServiceImpl;
    @GetMapping("/get-list-chips")
    public ResponseEntity<?> getListChips() {
        return new ResponseEntity<>(chipClientServiceImpl.getListChips(), null, 200);
    }

}
