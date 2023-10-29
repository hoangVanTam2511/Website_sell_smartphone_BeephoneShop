package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChip;
import beephone_shop_projects.core.admin.product_management.model.responce.ChipResponce;
import beephone_shop_projects.core.admin.product_management.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Chip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChipServiceImpl1 {

    @Autowired
    private ChipRepository chipRepository;


    public Page<Chip> getAll(Pageable pageable) {
        return chipRepository.findAllByDelected(true,pageable);
    }

    public void insert(Chip chip) {
       chipRepository.save(chip);
    }

    public void insert(CreateChip req) {

        if(!req.getIdChip().isEmpty()) update(req);
        else {
            String newCode = this.chipRepository.getNewCode() == null ? "CHIP_0" : "CHIP_" + this.chipRepository.getNewCode();
            Chip chip = new Chip();
            chip.setTenChip(req.getNameChip());
            chip.setMa(newCode);
            chipRepository.save(chip);
        }
    }

    public void update(CreateChip req) {
        Chip chip = this.chipRepository.findById(req.getIdChip()).get();
        chip.setTenChip(req.getNameChip());
        chipRepository.save(chip);
    }

    public void delete(String id) {
       chipRepository.updateDelected(false,id);
    }

    public Chip getOne(String id){
        return chipRepository.findById(id).get();
    }

    public ArrayList<Chip> getListChip(){
        return (ArrayList<Chip>) this.chipRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.chipRepository.getNewCode() == null ?"CHIP_0":"CHIP_"+ this.chipRepository.getNewCode() ;
    }

    public Page<ChipResponce> searchChip(String name, Pageable pageable){
        return chipRepository.searchChip("%" + name + "%", pageable, 1);
    }
}
