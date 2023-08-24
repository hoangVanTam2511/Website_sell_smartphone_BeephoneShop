package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateRam;
import beephone_shop_projects.core.admin.product_management.repository.RamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RamServiceImpl implements IService<Ram> {

    @Autowired
    private RamRepository ramRepository;


    @Override
    public Page<Ram> getAll(Pageable pageable) {
        return ramRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(Ram ram) {
         ramRepository.save(ram);
    }

    public void insert(CreateRam req) {
        Ram ram = new Ram(req.getMaram(),req.getTenram());
        ramRepository.save(ram);
    }

    @Override
    public void update(Ram ram, String id) {
        ramRepository.save(ram);
    }

    @Override
    public void delete(String id) {
       ramRepository.updateDelected(false,id);
    }

    public Ram getOne(String id){
        return ramRepository.findById(id).get();
    }

    public ArrayList<Ram> getDanhSachRam(){
      return (ArrayList<Ram>) this.ramRepository.findAllByDelected(true);
    }

    public String generateNewCode(){return this.ramRepository.getNewCode();}
}
