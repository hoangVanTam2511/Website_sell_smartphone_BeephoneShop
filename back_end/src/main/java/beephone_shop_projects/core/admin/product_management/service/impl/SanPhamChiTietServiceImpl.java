package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.CauHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamChiTietRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SanPhamChiTietServiceImpl  {

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    private CauHinhRepository cauHinhRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public void addSanPhamChiTiet(ArrayList<String> listId,String idSanPham){
        SanPham sanPham = sanPhamRepository.findById(idSanPham).get();
        listId.forEach((item) -> {
            SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
            sanPhamChiTiet.setIdSanPham(sanPham);
//            sanPhamChiTiet.setIdCauHinh(cauHinhRepository.findById(item).get());
            sanPhamChiTietRepository.save(sanPhamChiTiet);
        });

    }
}
