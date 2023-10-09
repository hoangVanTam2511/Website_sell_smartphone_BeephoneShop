package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateManHinh;
import beephone_shop_projects.core.admin.product_management.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.util.ArrayList;

@Service
public class ManHinhServiceImpl implements IService<ManHinh> {

    @Autowired
    private ManHinhRepository manHinhRepository;


    @Override
    public Page<ManHinh> getAll(Pageable pageable) {
        return manHinhRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(ManHinh manHinh) {
       manHinhRepository.save(manHinh);
    }

    public void insert(CreateManHinh req) {
        ManHinh manHinh = new ManHinh(req.getMamanHinh(),req.getTenmanHinh(),req.getDoPhanGiai());
        manHinhRepository.save(manHinh);
    }

    @Override
    public void update(ManHinh manHinh, String id) {
      manHinhRepository.save(manHinh);
    }

    @Override
    public void delete(String id) {
      manHinhRepository.updateDelected(false,id);
    }

    public ManHinh getOne(String id){
        return manHinhRepository.findById(id).get();
    }

    public ArrayList<ManHinh> getDanhSachManHinh(){
        return (ArrayList<ManHinh>)
                this.manHinhRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.manHinhRepository.getNewCode() == null ?"DISPLAY_0":"DISPLAY_"+ this.manHinhRepository.getNewCode() ;
    }
}
