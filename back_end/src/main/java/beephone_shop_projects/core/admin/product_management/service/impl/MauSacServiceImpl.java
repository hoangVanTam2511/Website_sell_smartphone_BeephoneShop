package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MauSacServiceImpl implements IService<MauSac> {

    @Autowired
    private MauSacRepository mauSacRepository;


    @Override
    public Page<MauSac> getAll(Pageable pageable) {
        return mauSacRepository.findAll(pageable);
    }

    @Override
    public void insert(MauSac mauSac) {
        mauSacRepository.save(mauSac);
    }

    @Override
    public void update(MauSac mauSac, String id) {
        mauSacRepository.save(mauSac);
    }

    @Override
    public void delete(String id) {
        mauSacRepository.deleteById(id);
    }

    public MauSac getOne(String id){
        return mauSacRepository.findById(id).get();
    }
}
