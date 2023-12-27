package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.servies.impl.DisplayClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/display")
@CrossOrigin(origins = "http://localhost:3001")
public class DisplayClientController {

    @Autowired
    private DisplayClientServiceImpl displayClientServiceImpl;

    @GetMapping("/get-list-displays")
    public ResponseEntity<?> getListDisplays() {
        return new ResponseEntity<>(displayClientServiceImpl.getListDisplays(), null, 200);
    }
}
