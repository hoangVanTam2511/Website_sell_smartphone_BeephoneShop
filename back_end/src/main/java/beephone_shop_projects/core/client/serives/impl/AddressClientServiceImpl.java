package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.repositories.AddressClientRepository;
import beephone_shop_projects.entity.DiaChi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AddressClientServiceImpl {

    @Autowired
    private AddressClientRepository addressClientRepository;

    public ArrayList<?> findAddressById(String id){
        return addressClientRepository.findAddressById(id);
    }

}
