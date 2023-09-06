package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.AnhRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Anh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class AnhServiceImpl implements IService<Anh> {

    @Autowired
    private AnhRepository anhRepository;


    @Override
    public Page<Anh> getAll(Pageable pageable) {
        return anhRepository.findAllByDelected(true,pageable);
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
        anhRepository.updateDelected(false,id);
    }

    public Anh getOne(String id){
        return anhRepository.findById(id).get();
    }

    public ArrayList<Anh> getListAnh(){
        return (ArrayList<Anh>) this.anhRepository.findAll();
    }
}
