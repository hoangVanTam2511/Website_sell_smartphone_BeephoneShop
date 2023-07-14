package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.ChiTietSanPhamReponsitory;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.ChiTietSanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ChiTietSanPhamServiceImpl implements IService<ChiTietSanPham> {

    @Autowired
    private ChiTietSanPhamReponsitory chiTietSanPhamReponsitory;


    @Override
    public Page<ChiTietSanPham> getAll(Pageable pageable) {
        return chiTietSanPhamReponsitory.findAll(pageable);
    }

    @Override
    public void insert(ChiTietSanPham chiTietSanPham) {
       chiTietSanPhamReponsitory.save(chiTietSanPham);
    }

    @Override
    public void update(ChiTietSanPham chiTietSanPham, String id) {
        chiTietSanPhamReponsitory.save(chiTietSanPham);
    }

    @Override
    public void delete(String id) {
        chiTietSanPhamReponsitory.deleteById(id);
    }
}
