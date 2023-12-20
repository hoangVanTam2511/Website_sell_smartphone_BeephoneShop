package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.PinClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PinClientServiceImpl {

    @Autowired
    private PinClientRepository pinClientRepository;

    public Object getListPins() {
        return pinClientRepository.findAll();
    }
}
