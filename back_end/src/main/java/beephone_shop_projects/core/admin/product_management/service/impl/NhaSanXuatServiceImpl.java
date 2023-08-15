package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.NhaSanXuatRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.NhaSanXuat;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NhaSanXuatServiceImpl implements IService<NhaSanXuat> {

    @Autowired
    private NhaSanXuatRepository nhaSanXuatRepository;

    @Override
    public Page<NhaSanXuat> getAll(Pageable pageable) {
        return nhaSanXuatRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(NhaSanXuat nhaSanXuat) {
        nhaSanXuatRepository.save(nhaSanXuat);
    }

    @Override
    public void update(NhaSanXuat nhaSanXuat, String id) {
        nhaSanXuatRepository.save(nhaSanXuat);
    }

    @Override
    public void delete(String id) {
        nhaSanXuatRepository.updateDelected(false,id);
    }

    public NhaSanXuat getOne(String id){
        return nhaSanXuatRepository.findById(id).get();
    }

    public ArrayList<NhaSanXuat> getDanhSachNhaSanXuat(){
        return (ArrayList<NhaSanXuat>) nhaSanXuatRepository.findAllByDelected(true);
    }
}
