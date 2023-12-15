package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateImageRequest;
import beephone_shop_projects.core.admin.product_management.repository.ImageRepository;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class ImageServiceImpl1 {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    public Anh insert(CreateImageRequest req) {

        SanPhamChiTiet sanPhamChiTiet = productDetailRepository.findById(req.getIdChiTietSanPham()).orElseThrow();

        Anh anh = new Anh();
        anh.setMa(imageRepository.getNewCode() == null ? "ANH_O" : "ANH_" + imageRepository.getNewCode());
        anh.setTenAnh(req.getTenAnh());
        anh.setDuongDan(req.getDuongDan());
        anh.setTrangThai(req.getTrangThai());
        anh.setSanPhamChiTiet(sanPhamChiTiet);

        return imageRepository.save(anh);
    }

    public ArrayList<Anh> findByIDChiTietSanPham(String idChiTietSanPham) {
        return imageRepository.findByIDChiTietSanPham(idChiTietSanPham);
    }

}
