package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateBrand;
import beephone_shop_projects.core.admin.product_management.model.responce.BrandResponce;
import beephone_shop_projects.core.admin.product_management.repository.BrandRepository;
import beephone_shop_projects.entity.Hang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandServiceImpl{

    @Autowired
    private BrandRepository brandRepository;

    public Page<Hang> getAll(Pageable pageable) {
        return brandRepository.findAllByDelected(true,pageable);
    }

    public void insert(Hang hang) {
        brandRepository.save(hang);
    }

    public void insert(CreateBrand req) {
        if(!req.getIdBrand().isEmpty()) update(req);
        else {
            String newCode = this.brandRepository.getNewCode() == null ? "PRODUCER_0" : "PRODUCER_" + this.brandRepository.getNewCode();
//            Hang hang = new Hang(newCode, req.getNameBrand());
//            brandRepository.save(hang);
        }
    }

    public void update(CreateBrand req) {
        Hang hang = this.brandRepository.findById(req.getIdBrand()).get();
        hang.setTenHang(req.getNameBrand());
        brandRepository.save(hang);
    }

    public void delete(String id) {
        brandRepository.updateDelected(false,id);
    }

    public Hang getOne(String id){
        return brandRepository.findById(id).get();
    }

    public ArrayList<Hang> getDanhSachNhaSanXuat(){
        return (ArrayList<Hang>) brandRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.brandRepository.getNewCode() == null ?"PRODUCER_0":"PRODUCER_"+ this.brandRepository.getNewCode() ;
    }

    public Page<BrandResponce> searchBrand(String name, Pageable pageable){
        return brandRepository.searchHang("%" + name + "%", pageable,1);
    }
}
