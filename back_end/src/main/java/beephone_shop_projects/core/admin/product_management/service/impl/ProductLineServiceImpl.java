package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductLine;
import beephone_shop_projects.core.admin.product_management.model.responce.ProductLineResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.RamResponce;
import beephone_shop_projects.core.admin.product_management.repository.ProductLineRepository;
import beephone_shop_projects.entity.DongSanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductLineServiceImpl {

    @Autowired
    private ProductLineRepository productLineRepository;


    public Page<DongSanPham> getAll(Pageable pageable) {
        return productLineRepository.findAllByDelected(true, pageable);
    }

    public void insert(DongSanPham req) {
        productLineRepository.save(req);
    }

    public void insert(CreateProductLine req) {

        if(!req.getIdProductLine().isEmpty()) update(req);

        String newCode = this.productLineRepository.getNewCode() == null ? "PRODUCT_LINE_0" : "PRODUCT_LINE_" + this.productLineRepository.getNewCode();
        DongSanPham dongSanPham = new DongSanPham(newCode,req.getNameProductLine());
        productLineRepository.save(dongSanPham);
    }

    public void update(CreateProductLine req) {
        DongSanPham productLine = this.productLineRepository.findById(req.getIdProductLine()).get();
        productLine.setTenDongSanPham(req.getNameProductLine());
        productLineRepository.save(productLine);
    }

    public void delete(String id) {
        productLineRepository.updateDelected(false, id);
    }

    public DongSanPham getOne(String id) {
        return productLineRepository.findById(id).get();
    }

    public ArrayList<DongSanPham> getDanhSachDongSanPham() {
        return (ArrayList<DongSanPham>) this.productLineRepository.findAllByDelected(true);
    }

    public String generateNewCode() {
        return this.productLineRepository.getNewCode() == null ? "PRODUCT_LINE_0" : "PRODUCT_LINE_" + this.productLineRepository.getNewCode();
    }

    public Page<ProductLineResponce> searchProductLine(String name, Pageable pageable){
        return productLineRepository.searchProductLine("%" + name + "%", pageable, 1);
    }

}
