package beephone_shop_projects.core.web_socket;

import beephone_shop_projects.infrastructure.websocket.Hello;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class BillController {

    @MessageMapping("/bills")
    @SendTo("/bill/bills")
    public Hello getListBill(@Payload Hello message) {
        System.out.println(message  );
        return message ;
    }

}
