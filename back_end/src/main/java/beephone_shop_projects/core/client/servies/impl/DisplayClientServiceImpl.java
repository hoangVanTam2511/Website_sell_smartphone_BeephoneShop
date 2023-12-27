package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.DisplayClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisplayClientServiceImpl {

    @Autowired
    private DisplayClientRepository displayClientRepository;

    public Object getListDisplays() {
        return displayClientRepository.findAll();
    }
}
