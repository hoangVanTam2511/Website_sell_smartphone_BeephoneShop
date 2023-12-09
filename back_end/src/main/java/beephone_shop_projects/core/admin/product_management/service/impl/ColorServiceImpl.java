package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateColor;
import beephone_shop_projects.core.admin.product_management.model.responce.ColorResponce;
import beephone_shop_projects.core.admin.product_management.repository.ColorRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ColorServiceImpl{

    @Autowired
    private ColorRepository colorRepository;


    public Page<MauSac> getAll(Pageable pageable) {
        return colorRepository.findAllByDelected(true,pageable);
    }

    public void insert(MauSac mauSac) {
        colorRepository.save(mauSac);
    }

    public void insert(CreateColor req) {

        if(!req.getIdColor().isEmpty()) update(req);
        else {
            String newCode = this.colorRepository.getNewCode() == null ? "COLOR_0" + "_" : "COLOR_" + this.colorRepository.getNewCode();
//            MauSac mauSac = new MauSac(newCode, req.getNameColor());
//            colorRepository.save(mauSac);
        }
    }

    public void update(CreateColor req) {
        MauSac mauSac = this.colorRepository.findById(req.getIdColor()).get();
//        mauSac.setTenMauSac(req.getNameColor());
        colorRepository.save(mauSac);
    }

    public void delete(String id) {
        colorRepository.updateDelected(false,id);
    }

    public MauSac getOne(String id){
        return colorRepository.findById(id).get();
    }

    public ArrayList<MauSac> getDanhSachMauSac(){
        return (ArrayList<MauSac>) this.colorRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.colorRepository.getNewCode() == null ?"COLOR_0":"COLOR_"+ this.colorRepository.getNewCode() ;
    }

    public Page<ColorResponce> searchColor(String name, Pageable pageable){
        return colorRepository.searchColorByDelected("%" + name + "%", pageable, 1);
    }
}
