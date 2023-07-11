package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.HinhThucSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HinhThucSanPhamServiceImpl implements IService<HinhThucSanPham> {

    @Autowired
    private HinhThucSanPhamRepository hinhThucSanPhamRepository;


    @Override
    public Page<HinhThucSanPham> getAll(Pageable pageable) {
        return hinhThucSanPhamRepository.findAll(pageable) ;
    }

    @Override
    public void insert(HinhThucSanPham hinhThucSanPham) {
        hinhThucSanPhamRepository.save(hinhThucSanPham);
    }

    @Override
    public void update(HinhThucSanPham hinhThucSanPham, String id) {
        hinhThucSanPhamRepository.save(hinhThucSanPham);
    }

    @Override
    public void delete(String id) {
        hinhThucSanPhamRepository.deleteById(id);
    }

    public HinhThucSanPham getOne(String id){
        return hinhThucSanPhamRepository.findById(id).get();
    }
}
