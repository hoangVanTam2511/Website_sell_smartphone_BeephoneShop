package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.BrandClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrandClientServiceImpl {

    @Autowired
    private BrandClientRepository brandClientRepository;

    public Object getListBrands() {
        return brandClientRepository.findAll();
    }
}
