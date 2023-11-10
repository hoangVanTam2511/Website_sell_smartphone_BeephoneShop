package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.models.response.ConfigResponce;
import beephone_shop_projects.core.client.models.response.ProductDetailResponse;
import beephone_shop_projects.core.client.models.response.ProductResponce;
import beephone_shop_projects.core.client.repositories.ProductClientRepository;
import beephone_shop_projects.core.client.repositories.ProductDetailClientRepository;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductDetailClientService {

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    @Autowired
    private ProductClientRepository productClientRepository;

    public ArrayList<ProductDetailResponse> getProductDetails() {
        ArrayList<SanPham> products = (ArrayList<SanPham>) productClientRepository.findAll();

        ArrayList<ProductDetailResponse> responses = new ArrayList<>();
        for (SanPham product : products) {
           if(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(product.getId()) != null) {
               responses.add(productDetailClientRepository.getProductDetailWithRamMinAndRomMin(product.getId()));
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

}
