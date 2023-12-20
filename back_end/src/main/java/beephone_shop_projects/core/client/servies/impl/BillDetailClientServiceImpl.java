package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.models.response.ProductDetailFillterResponce;
import beephone_shop_projects.core.client.models.response.ProductOfBillDetail;
import beephone_shop_projects.core.client.repositories.BillDetailClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BillDetailClientServiceImpl {

    @Autowired
    private BillDetailClientRepository billDetailClientRepository;

    public ArrayList<ProductOfBillDetail> getListProductOfDetailByIDBill(String idBill){
        return billDetailClientRepository.getProductOfDetailsByIDBill(idBill);
    }

    public ArrayList<ProductDetailFillterResponce> getAllProductDetailFillterResponce(){
        return billDetailClientRepository.getAllProductDetailFillterResponce();
    }
}
