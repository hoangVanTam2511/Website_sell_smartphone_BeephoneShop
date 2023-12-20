package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.ProductLineClientRepository;
import beephone_shop_projects.entity.DongSanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductLineServiceClientImpl {

    @Autowired
    private ProductLineClientRepository productLineClientRepository;

    public ArrayList<DongSanPham> getListProductLines() {
        return (ArrayList<DongSanPham>) productLineClientRepository.findAll();
    }

}
