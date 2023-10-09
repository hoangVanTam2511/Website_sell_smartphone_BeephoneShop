package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateImageRequest;
import beephone_shop_projects.core.admin.product_management.repository.AnhRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamChiTietRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AnhServiceImpl {

    @Autowired
    private AnhRepository anhRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    public Anh insert(CreateImageRequest req) {
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(req.getIdChiTietSanPham()).orElseThrow();

       Anh anh = new Anh();

       anh.setMa(anhRepository.getNewCode());
       anh.setTenAnh(req.getTenAnh());
       anh.setDuongDan(req.getDuongDan());
       anh.setTrangThai(req.getTrangThai());
       anh.setSanPhamChiTiet(sanPhamChiTiet);

       return anhRepository.save(anh);
    }

}
