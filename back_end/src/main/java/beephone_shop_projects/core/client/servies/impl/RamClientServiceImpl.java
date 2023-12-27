package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.RamClientRepository;
import beephone_shop_projects.entity.Ram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RamClientServiceImpl {

    @Autowired
    private RamClientRepository ramClientRepository;

    public ArrayList<Ram> getListRams() {
        return (ArrayList<Ram>) ramClientRepository.findAll();
    }
}
