package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateRom;
import beephone_shop_projects.core.admin.product_management.model.responce.RomResponce;
import beephone_shop_projects.core.admin.product_management.repository.RomRepository;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class RomServiceImpl1 {

    @Autowired
    private RomRepository romRepository;

    public Page<Rom> getAll(Pageable pageable) {
        return romRepository.findAllByDelected(true,pageable);
    }

    public void insert(Rom rom) {
      romRepository.save(rom);
    }

    public void insert(CreateRom req) {
        if(!req.getIdRom().isEmpty()) update(req);
        else {
            String newCode = this.romRepository.getNewCode() == null ? "ROM_0" : "ROM_" + this.romRepository.getNewCode();
//            Rom rom = new Rom(newCode, req.getCapacityRom());
//            romRepository.save(rom);
        }
    }

    public void update(CreateRom req) {
        Rom rom = this.romRepository.findById(req.getIdRom()).get();
        rom.setDungLuong(req.getCapacityRom());
        romRepository.save(rom);}

    public void delete(String id) {
        romRepository.updateDelected(false,id);
    }

    public Rom getOne(String id){
        return romRepository.findById(id).get();
    }

    public ArrayList<Rom> getDanhSachRom(){
        return (ArrayList<Rom>) this.romRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.romRepository.getNewCode() == null ?"ROM_0":"ROM_"+ this.romRepository.getNewCode() ;
    }

    public Page<RomResponce> searchRom(String name, Pageable pageable){
        return romRepository.searchRomByDelected("%" + name + "%", pageable, 1);
    }
}
