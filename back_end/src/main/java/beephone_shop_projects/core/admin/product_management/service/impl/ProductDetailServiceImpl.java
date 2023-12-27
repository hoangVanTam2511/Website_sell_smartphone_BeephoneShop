package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductDetailRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.ProductDetailResponce;
import beephone_shop_projects.core.admin.product_management.repository.CauHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
import beephone_shop_projects.core.admin.product_management.repository.ProductRepository;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductDetailServiceImpl {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private CauHinhRepository cauHinhRepository;

    @Autowired
    private ProductRepository productRepository;
    public SanPhamChiTiet insert(CreateProductDetailRequest req){

        SanPham sanPham = productRepository.findById(req.getIdSanPham()).orElseThrow();
        CauHinh cauHinh = cauHinhRepository.findById(req.getId()).orElseThrow();

        SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
        sanPhamChiTiet.setMa(productDetailRepository.getNewCode() == null ? "PRODUCT_DETAIL_0" : "PRODUCT_DETAIL_" + this.productDetailRepository.getNewCode());
        sanPhamChiTiet.setSanPham(sanPham);
//        sanPhamChiTiet.setCauHinh(cauHinh);
        sanPhamChiTiet.setDonGia(req.getDonGia());
        sanPhamChiTiet.setSoLuongTonKho(req.getSoLuong());

        return productDetailRepository.save(sanPhamChiTiet);
    }

    public ArrayList<ProductDetailResponce> getListProductDetailByID(String idSanPham){
        return  this.productDetailRepository.getListProductDetailByID(idSanPham);
    }
}
