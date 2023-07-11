package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ChipServiceImpl implements IService<Chip> {

    @Autowired
    private ChipRepository chipRepository;


    @Override
    public Page<Chip> getAll(Pageable pageable) {
        return chipRepository.findAll(pageable);
    }

    @Override
    public void insert(Chip chip) {
       chipRepository.save(chip);
    }

    @Override
    public void update(Chip chip, String id) {
       chipRepository.save(chip);
    }

    @Override
    public void delete(String id) {
       chipRepository.deleteById(id);
    }

    public Chip getOne(String id){
        return chipRepository.findById(id).get();
    }
}
