package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.ChipClientRepository;
import beephone_shop_projects.entity.Chip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ChipClientServiceImpl {

    @Autowired
    private ChipClientRepository chipClientRepository;

    public ArrayList<Chip> getListChips() {
     return (ArrayList<Chip>) chipClientRepository.findAll();
    }
}
