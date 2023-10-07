package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductDetailRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.ProductDetailResponce;
import beephone_shop_projects.core.admin.product_management.repository.CauHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamChiTietRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.entity.CauHinh;
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
    public SanPhamChiTiet insert(CreateProductDetailRequest req){

        SanPham sanPham = sanPhamRepository.findById(req.getIdSanPham()).orElseThrow();
        CauHinh cauHinh = cauHinhRepository.findById(req.getId()).orElseThrow();

        SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
        sanPhamChiTiet.setMa(sanPhamChiTietRepository.getNewCode() == null ? "PRODUCT_DETAIL_0" : "PRODUCT_DETAIL_" + this.sanPhamChiTietRepository.getNewCode());
        sanPhamChiTiet.setIdSanPham(sanPham);
        sanPhamChiTiet.setIdCauHinh(cauHinh);
        sanPhamChiTiet.setDonGia(req.getDonGia());
        sanPhamChiTiet.setSoLuongTonKho(req.getSoLuong());

        return sanPhamChiTietRepository.save(sanPhamChiTiet);
    }

    public ArrayList<ProductDetailResponce> getListProductDetailByID(String idSanPham){
        return  this.sanPhamChiTietRepository.getListProductDetailByID(idSanPham);
    }
}
