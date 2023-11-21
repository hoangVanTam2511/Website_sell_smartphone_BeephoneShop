package beephone_shop_projects.core.client.controller;

import beephone_shop_projects.core.client.serives.impl.VoucherClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/voucher")
public class VoucherClientController {

    @Autowired
    private VoucherClientServiceImpl voucherClientService;


}
