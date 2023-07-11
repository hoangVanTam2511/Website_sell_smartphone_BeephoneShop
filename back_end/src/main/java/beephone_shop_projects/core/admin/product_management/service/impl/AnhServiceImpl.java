package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.AnhRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class AnhServiceImpl implements IService<Anh> {

    @Autowired
    private AnhRepository anhRepository;


    @Override
    public Page<Anh> getAll(Pageable pageable) {
        return anhRepository.findAll(pageable);
    }

    @Override
    public void insert(Anh anh) {
       anhRepository.save(anh);
    }

    @Override
    public void update(Anh anh, String id) {
        anhRepository.save(anh);
    }

    @Override
    public void delete(String id) {
        anhRepository.deleteById(id);
    }

    public Anh getOne(String id){
        return anhRepository.findById(id).get();
    }
}
