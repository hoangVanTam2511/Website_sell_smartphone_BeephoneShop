package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.RamClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/ram")
@CrossOrigin(origins = "http://localhost:3001")
public class RamClientController {

    @Autowired
    private RamClientServiceImpl ramClientService;

    @GetMapping("/get-all-ram")
    public ResponseEntity<?> getAllRam(){
        return new ResponseEntity<>(ramClientService.getListRams(), null, 200);
    }
}
