package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateMauSac;
import beephone_shop_projects.core.admin.product_management.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MauSacServiceImpl implements IService<MauSac> {

    @Autowired
    private MauSacRepository mauSacRepository;


    @Override
    public Page<MauSac> getAll(Pageable pageable) {
        return mauSacRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(MauSac mauSac) {
        mauSacRepository.save(mauSac);
    }

    public void insert(CreateMauSac req) {
        MauSac mauSac  = new MauSac(req.getMamauSac(),req.getTenmauSac());
        mauSacRepository.save(mauSac);
    }

    @Override
    public void update(MauSac mauSac, String id) {
        mauSacRepository.save(mauSac);
    }

    @Override
    public void delete(String id) {
        mauSacRepository.updateDelected(false,id);
    }

    public MauSac getOne(String id){
        return mauSacRepository.findById(id).get();
    }

    public ArrayList<MauSac> getDanhSachMauSac(){
        return (ArrayList<MauSac>) this.mauSacRepository.findAllByDelected(true);
    }

    public String generateNewCode(){return this.mauSacRepository.getNewCode();}
}
