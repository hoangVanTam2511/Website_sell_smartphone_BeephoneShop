package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.RomRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SanPhamServiceImpl implements IService<SanPham> {

    @Autowired
    private SanPhamRepository sanPhamRepository;


    @Override
    public Page<SanPham> getAll(Pageable pageable) {
        return sanPhamRepository.findAll(pageable);
    }

    @Override
    public void insert(SanPham sanPham) {
        sanPhamRepository.save(sanPham);
    }

    @Override
    public void update(SanPham sanPham, String id) {
        sanPhamRepository.save(sanPham);
    }

    @Override
    public void delete(String id) {
        sanPhamRepository.deleteById(id);
    }

    public SanPham getOne(String id){
        return sanPhamRepository.findById(id).get();
    }
}
