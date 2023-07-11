package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;

@Service
public class ManHinhServiceImpl implements IService<ManHinh> {

    @Autowired
    private ManHinhRepository manHinhRepository;


    @Override
    public Page<ManHinh> getAll(Pageable pageable) {
        return manHinhRepository.findAll(pageable);
    }

    @Override
    public void insert(ManHinh manHinh) {
       manHinhRepository.save(manHinh);
    }

    @Override
    public void update(ManHinh manHinh, String id) {
      manHinhRepository.save(manHinh);
    }

    @Override
    public void delete(String id) {
      manHinhRepository.deleteById(id);
    }

    public ManHinh getOne(String id){
        return manHinhRepository.findById(id).get();
    }
}
