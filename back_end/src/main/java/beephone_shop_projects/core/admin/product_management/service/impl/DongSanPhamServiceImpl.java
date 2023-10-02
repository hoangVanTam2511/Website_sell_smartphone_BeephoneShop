package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateDongSanPham;
import beephone_shop_projects.core.admin.product_management.repository.DongSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DongSanPhamServiceImpl implements IService<DongSanPham> {

    @Autowired
    private DongSanPhamRepository dongSanPhamRepository;


    @Override
    public Page<DongSanPham> getAll(Pageable pageable) {
        return dongSanPhamRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(DongSanPham req) {
       dongSanPhamRepository.save(req);
    }

    public void insert(CreateDongSanPham req) {
        DongSanPham dongSanPham = new DongSanPham();
        dongSanPham.setTenDongSanPham(req.getTenDongSanPham());
        dongSanPham.setMa(req.getMaDongSanPham());
        dongSanPhamRepository.save(dongSanPham);
    }

    @Override
    public void update(DongSanPham dongSanPham, String id) {
        dongSanPhamRepository.save(dongSanPham);
    }

    @Override
    public void delete(String id) {
        dongSanPhamRepository.updateDelected(false,id);
    }

    public DongSanPham getOne(String id){
        return dongSanPhamRepository.findById(id).get();
    }

    public ArrayList<DongSanPham> getDanhSachDongSanPham(){
        return (ArrayList<DongSanPham>) this.dongSanPhamRepository.findAllByDelected(true);
    }

    public String generateNewCode(){return this.dongSanPhamRepository.getNewCode();}
}
