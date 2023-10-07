package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateMauSac;
import beephone_shop_projects.core.admin.product_management.repository.ColorRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ColorServiceImpl implements IService<MauSac> {

    @Autowired
    private ColorRepository colorRepository;


    @Override
    public Page<MauSac> getAll(Pageable pageable) {
        return colorRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(MauSac mauSac) {
        colorRepository.save(mauSac);
    }

    public void insert(CreateMauSac req) {
        MauSac mauSac  = new MauSac(req.getMamauSac(),req.getTenmauSac());
        colorRepository.save(mauSac);
    }

    @Override
    public void update(MauSac mauSac, String id) {
        colorRepository.save(mauSac);
    }

    @Override
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
}
