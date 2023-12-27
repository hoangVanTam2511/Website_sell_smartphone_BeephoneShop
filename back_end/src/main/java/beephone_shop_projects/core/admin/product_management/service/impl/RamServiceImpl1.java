package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateRam;
import beephone_shop_projects.core.admin.product_management.model.responce.RamResponce;
import beephone_shop_projects.core.admin.product_management.repository.RamRepository;
import beephone_shop_projects.entity.Ram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RamServiceImpl1 {

    @Autowired
    private RamRepository ramRepository;


    public Page<Ram> getAll(Pageable pageable) {
        return ramRepository.findAllByDelected(true,pageable);
    }

    public void insert(Ram ram) {
         ramRepository.save(ram);
    }

    public void insert(CreateRam req) {
        if(!req.getIdRam().isEmpty()) update(req);
        else {
            String newCode = this.ramRepository.getNewCode() == null ? "RAM_0" : "RAM_" + this.ramRepository.getNewCode();
//            Ram ram = new Ram(newCode, req.getCapacityRam());
//            ramRepository.save(ram);
        }
    }

    public void update(CreateRam req) {
        Ram ram = this.ramRepository.findById(req.getIdRam()).get();
        ram.setDungLuong(req.getCapacityRam());
        ramRepository.save(ram);
    }

    public void delete(String id) {
       ramRepository.updateDelected(false,id);
    }

    public Ram getOne(String id){
        return ramRepository.findById(id).get();
    }

    public ArrayList<Ram> getDanhSachRam(){
      return (ArrayList<Ram>) this.ramRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.ramRepository.getNewCode() == null ?"RAM_0":"RAM_"+ this.ramRepository.getNewCode() ;
    }

    public Page<RamResponce> searchRam(String name, Pageable pageable){
        return ramRepository.searchRamByDelected("%" + name + "%", pageable, 1);
    }
}
