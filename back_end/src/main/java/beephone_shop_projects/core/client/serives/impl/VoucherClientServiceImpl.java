package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.repositories.VoucherClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherClientServiceImpl {

    @Autowired
    private VoucherClientRepository voucherClientRepository;

}
