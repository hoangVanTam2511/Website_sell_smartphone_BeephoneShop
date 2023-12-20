package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.models.request.NotificationRequest;
import beephone_shop_projects.core.client.servies.impl.NotificationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/notification")
@CrossOrigin(origins = "http://localhost:3001")
public class NotificationClientController {

    @Autowired
    private NotificationServiceImpl notificationService;

    @PostMapping("/add-notification")
    public void addNotification(@RequestBody NotificationRequest notificationRequest){
        try{
            notificationService.addNotification(notificationRequest);
        }catch (Exception ex){
           ex.printStackTrace();
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllNotification(){
        return new ResponseEntity<>(notificationService.getAllNotification(), HttpStatus.OK);
    }
}
