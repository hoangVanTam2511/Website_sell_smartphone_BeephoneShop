package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.repositories.DanhMucClientRepository;
import beephone_shop_projects.entity.DanhMuc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhMucClientServiceImpl {

    @Autowired
    private DanhMucClientRepository danhMucClientRepository;

    public List<DanhMuc> getListDanhMuc() {
        return danhMucClientRepository.findAll();
    }
}
