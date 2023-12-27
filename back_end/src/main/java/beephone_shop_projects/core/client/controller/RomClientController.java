package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.RomClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/rom")
@CrossOrigin(origins = "http://localhost:3001")
public class RomClientController {

    @Autowired
    private RomClientServiceImpl romClientServiceImpl;

    @GetMapping("/get-all-rom")
    public ResponseEntity<?> getAllRom(){
        return new ResponseEntity<>(romClientServiceImpl.getListRoms(), null, 200);
    }
}
