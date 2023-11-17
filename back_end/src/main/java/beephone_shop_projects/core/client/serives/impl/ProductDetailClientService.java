package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.models.request.SearchProductDetailClient;
import beephone_shop_projects.core.client.models.response.ConfigResponce;
import beephone_shop_projects.core.client.models.response.ProductDetailResponce;
import beephone_shop_projects.core.client.models.response.ProductResponce;
import beephone_shop_projects.core.client.repositories.ProductClientRepository;
import beephone_shop_projects.core.client.repositories.ProductDetailClientRepository;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class ProductDetailClientService {

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    @Autowired
    private ProductClientRepository productClientRepository;

    public ArrayList<ProductDetailResponce> getProductDetails() {
        ArrayList<SanPham> products = (ArrayList<SanPham>) productClientRepository.findAll();

        ArrayList<ProductDetailResponce> responses = new ArrayList<>();
        for (SanPham product : products) {
           if(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(product.getId()) != null) {
               responses.add(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(product.getId()));
           }
        }
        return responses;
    }

    public ArrayList<ProductDetailResponce> searchByAllPosition(SearchProductDetailClient chiTietSanPhamRequest) {
        ArrayList<String> idProducts = productDetailClientRepository.searchByAllPosition(
                chiTietSanPhamRequest.getRam() == null ? "%%" : "%" + chiTietSanPhamRequest.getRam() + "%",
                chiTietSanPhamRequest.getRom() == null ? "%%" : "%" + chiTietSanPhamRequest.getRom() + "%",
                chiTietSanPhamRequest.getNhaSanXuat() == null ? "%%" : "%" + chiTietSanPhamRequest.getNhaSanXuat() + "%",
                chiTietSanPhamRequest.getPin() == null ? "%%" : "%" + chiTietSanPhamRequest.getPin() + "%",
                chiTietSanPhamRequest.getDongSanPham() == null ? "%%" : "%" + chiTietSanPhamRequest.getDongSanPham() + "%",
                chiTietSanPhamRequest.getDonGiaMin() == null ? "0" : "" + chiTietSanPhamRequest.getDonGiaMin(),
                chiTietSanPhamRequest.getDonGiaMax() == null ? "1000000000000" : "" + chiTietSanPhamRequest.getDonGiaMax(),
                chiTietSanPhamRequest.getChip() == null ? "%%" : "%" + chiTietSanPhamRequest.getChip() + "%",
                chiTietSanPhamRequest.getManHinh() == null ? "%%" : "%" + chiTietSanPhamRequest.getManHinh() + "%",
                chiTietSanPhamRequest.getTanSoQuet() == null ? "%%" : "%" + chiTietSanPhamRequest.getTanSoQuet() + "%"
        );;

        ArrayList<ProductDetailResponce> responses = new ArrayList<>();
        for (String idProduct : idProducts) {
            if(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(idProduct) != null) {
                responses.add(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(idProduct));
            }
        }
        return responses;
    }

    public ArrayList<ConfigResponce> getConfig(String id_product) {
        return productDetailClientRepository.getConfigByIdProduct(id_product);
    }

    public ProductResponce getProductByIdProduct(String id_product) {
        return productDetailClientRepository.getProductByIdProduct(id_product);
    }

    public BigDecimal getMaxProductDetail(){
        return productDetailClientRepository.getMaxPriceOfProductDetail();
    }

    public BigDecimal getMinProductDetail(){
        return productDetailClientRepository.getMinPriceOfProductDetail();
    }

}
