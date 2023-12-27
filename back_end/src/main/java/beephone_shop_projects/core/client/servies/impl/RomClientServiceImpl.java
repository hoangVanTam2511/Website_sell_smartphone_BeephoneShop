package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.RomClientRepository;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RomClientServiceImpl {

    @Autowired
    private RomClientRepository romClientRepository;

    public ArrayList<Rom> getListRoms() {
        return (ArrayList<Rom>) romClientRepository.findAll();
    }
}
