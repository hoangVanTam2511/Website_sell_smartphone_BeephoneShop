package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.RomRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class RomServiceImpl implements IService<Rom> {

    @Autowired
    private RomRepository romRepository;

    @Override
    public Page<Rom> getAll(Pageable pageable) {
        return romRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(Rom rom) {
      romRepository.save(rom);
    }

    @Override
    public void update(Rom rom, String id) {
        romRepository.save(rom);
    }

    @Override
    public void delete(String id) {
        romRepository.updateDelected(false,id);
    }

    public Rom getOne(String id){
        return romRepository.findById(id).get();
    }

    public ArrayList<Rom> getDanhSachRom(){
        return (ArrayList<Rom>) this.romRepository.findAll();
    }
}
